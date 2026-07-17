"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJob } from "@/lib/services/jobs";
import { jobKeys } from "./jobKeys";

export function useDeleteJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteJob(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: jobKeys.all,
      });
    },
  });
}