"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createJob } from "@/lib/services/jobs";
import { JobInput } from "@/lib/validations/jobs";
import { jobKeys } from "./jobKeys";

export function useCreateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: JobInput) => createJob(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: jobKeys.all,
      });
    },
  });
}