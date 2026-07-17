"use client";

import { useQuery,keepPreviousData } from "@tanstack/react-query";
import { getJobs } from "../../lib/services/jobs";
import { jobKeys } from "./jobKeys";

interface UseJobsProps {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  type?: string;
  sort?: string;
  order?: "asc" | "desc";
}

export function useJobs({
  page = 1,
  limit = 10,
  search = "",
  status = "",
  type = "",
  sort = "createdAt",
  order = "desc",
}: UseJobsProps) {
  return useQuery({
    queryKey:jobKeys.list({
      page,limit,search,status,type,sort,order
    }),

    queryFn: () =>
      getJobs({
        page,
        limit,
        search,
        status,
        type,
        sort,
        order,
      }),

    placeholderData: keepPreviousData,
  });
}