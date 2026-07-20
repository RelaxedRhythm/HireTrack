"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import CandidateProfile from "../components/candidateProfile";
import CandidateApplicationsTable from "../components/candidateApplicationTable";

import LoadingState from "@/app/components/shared/loadingState";
import ErrorState from "@/app/components/shared/errorState";

import type { CandidateDetails } from "@/types/candidates";

export default function CandidateDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const [candidate, setCandidate] =
    useState<CandidateDetails | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCandidate() {
      try {
        setLoading(true);

        const res = await fetch(`/api/candidates/${id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch candidate");
        }

        const data = await res.json();

        setCandidate(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchCandidate();
  }, [id]);

  if (loading) {
    return <LoadingState message="Loading candidate..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!candidate) {
    return (
      <ErrorState message="Candidate not found." />
    );
  }

  return (
    <div className="space-y-6">
      <CandidateProfile candidate={candidate} />

      <CandidateApplicationsTable
        applications={candidate.applications}
      />
    </div>
  );
}