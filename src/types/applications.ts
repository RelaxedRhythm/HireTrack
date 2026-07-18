import type { ApplicationStatus } from "@prisma/client";
import type { Candidate } from "./candidates";
import type { Job } from "./job";
export interface Application {
  id: string;
  status: ApplicationStatus;
  candidate: Candidate;
  job: Job;
  notes?: string | null;
  rating?: number | null;
  createdAt: Date;
  updatedAt: Date;
}
