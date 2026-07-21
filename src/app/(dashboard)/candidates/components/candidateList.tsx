"use client";

import { useEffect, useState } from "react";
import { getCandidates } from "@/lib/services/candidates";

import type { Candidate } from "@/types/candidates";

import CandidatesTable from "./candidateTable";
import LoadingState from "@/app/components/shared/loadingState";

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
      try {
        setLoading(true);

        const data = await getCandidates({ search, page });

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

  console.log(candidates);
  console.log(setTotalPages);

  if (loading) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        <LoadingState message="Loading candidates"/>
      </div>
    );
  }

  return <CandidatesTable candidates={candidates} />;
}
