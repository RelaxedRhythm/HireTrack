import type { Candidate } from "@/types/candidates";

interface GetCandidatesParams {
  search: string;
  page: number;
}

interface GetCandidatesResponse {
  candidates: Candidate[];
  totalPages: number;
}

export async function getCandidates({
  search,
  page,
}: GetCandidatesParams): Promise<GetCandidatesResponse> {
  const params = new URLSearchParams({
    search,
    page: String(page),
  });

  const res = await fetch(`/api/candidates?${params}`);

  if (!res.ok) {
    throw new Error("Failed to fetch candidates");
  }

  const data= await res.json();

  return {
    candidates:data.candidates,
    totalPages:data.pagination.totalPages,
  }
}