"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateJob } from "@/lib/services/jobs";
import { JobInput } from "@/lib/validations/jobs";
import { jobKeys } from "./jobKeys";

interface UpdateJobPayload {
  id: string;
  data: JobInput;
}

export function useUpdateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateJobPayload) =>
      updateJob(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: jobKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: jobKeys.detail(variables.id),
      });
    },
  });
}