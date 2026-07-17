import { JobStatus, JobType } from "@prisma/client";

export interface JobFilters {
  search?: string;
  status?: JobStatus;
  type?: JobType;
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
}