"use client";

import { useEffect, useState } from "react";

import type { Application } from "@/types/applications";

import ApplicationsTable from "./applicationTable";

import LoadingState from "@/app/components/shared/loadingState";
import EmptyState from "@/app/components/shared/emptyState";
import ErrorState from "@/app/components/shared/errorState";

interface ApplicationListProps {
  refresh: number;
  setRefresh: React.Dispatch<React.SetStateAction<number>>;
  search: string;
  status: string;
  jobId: string;
  page: number;
  setTotalPages: (pages: number) => void;
}

export default function ApplicationList({
  refresh,
  setRefresh,
  search,
  status,
  jobId,
  page,
  setTotalPages,
}: ApplicationListProps) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchApplications() {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams({
          page: page.toString(),
          search,
          status,
          jobId,
        });

        const res = await fetch(`/api/applications?${params}`);

        if (!res.ok) {
          throw new Error("Failed to fetch applications");
        }

        const data = await res.json();

        setApplications(data.applications);
        setTotalPages(data.pagination.totalPages);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchApplications();
  }, [refresh, search, status, jobId, page, setTotalPages]);


  if (loading) {
    return <LoadingState message="Loading applications..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (applications.length === 0) {
    return <EmptyState message="No applications found." />;
  }

  return <ApplicationsTable applications={applications}  setRefresh={setRefresh} />;
}
