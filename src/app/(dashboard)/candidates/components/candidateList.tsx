"use client";

import { useEffect, useState } from "react";

import type { Candidate } from "@/types/candidates";

import CandidatesTable from "./candidateTable";

interface CandidateListProps {
  refresh: number;
  search: string;
  page: number;
  setTotalPages: (pages: number) => void;
}

export default function CandidateList({
  refresh,
  search,
  page,
  setTotalPages,
}: CandidateListProps) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCandidates() {
      setLoading(true);

      try {
        const params = new URLSearchParams({
          page: page.toString(),
          search,
        });

        const res = await fetch(`/api/candidates?${params}`);

        if (!res.ok) {
          throw new Error("Failed to fetch candidates");
        }

        const data = await res.json();

        setCandidates(data.candidates);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCandidates();
  }, [refresh, search, page, setTotalPages]);

  if (loading) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        Loading candidates...
      </div>
    );
  }

  return (
    <CandidatesTable
      candidates={candidates}
    />
  );
}