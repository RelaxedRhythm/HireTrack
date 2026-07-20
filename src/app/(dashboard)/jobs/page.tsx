"use client";

import { useEffect, useState } from "react";

import CreateJobDialog from "./components/createJobDialog";
import JobsTable from "./components/jobsTable";
import SearchBar from "../../components/shared/searchBar";
import Filters from "./components/filters";
import Pagination from "../../components/shared/pagination";
import type { Job } from "../../../types/job";
import { JobStatus, JobType } from "@prisma/client";
import LoadingState from "@/app/components/shared/loadingState";

// interface Job {
//   id: string;
//   title: string;
//   company: string;
//   location: string;
//   type: JobType;
//   status: JobStatus;
//   description?: string | null;
// }

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [status, setStatus] = useState<JobStatus | "all">("all");
  const [type, setType] = useState<JobType | "all">("all");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  async function fetchJobs() {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      params.append("page", page.toString());

      if (debouncedSearch.trim()) {
        params.append("search", debouncedSearch);
      }

      if (status !== "all") {
        params.append("status", status);
      }

      if (type !== "all") {
        params.append("type", type);
      }

      const response = await fetch(`/api/jobs?${params.toString()}`);

      if (!response.ok) {
        const error = await response.json().catch(() => null);

        console.error({
          status: response.status,
          statusText: response.statusText,
          error,
        });

        throw new Error(
          error?.message || `Failed to fetch jobs (${response.status})`,
        );
      }

      const data = await response.json();

      setJobs(data.jobs);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error("Fetch jobs error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchJobs();
  }, [page, debouncedSearch, status, type, refresh]);

  function handleFilterChange(callback: (value: string) => void) {
    return (value: string) => {
      setPage(1);

      callback(value);
    };
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Jobs</h1>

          <p className="text-muted-foreground">Manage your job applications</p>
        </div>

        <CreateJobDialog onSuccess={fetchJobs} />
      </div>

      {/* <JobList refresh={refresh}/> */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <SearchBar
          value={search}
          onChange={(value) => {
            setPage(1);
            setSearch(value);
          }}
          placeholder="searching jobs...."
        />

        <Filters
          status={status}
          type={type}
          onStatusChange={setStatus}
          onTypeChange={setType}
        />
      </div>

      {loading ? (
        <LoadingState message="Loading jobs" />
      ) : (
        <JobsTable jobs={jobs} onRefresh={fetchJobs} />
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
