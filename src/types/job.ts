import { JobStatus, JobType,Prisma } from "@prisma/client";
import { Application } from "@/types/applications";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string |null;
  salary:string | null;
  type: JobType;
  status: JobStatus;
  description?: string | null;
  createdAt?: string; 
  applications: Application[];
}

export interface JobFilters {
  search?: string;
  status?: JobStatus;
  type?: JobType;
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface JobsResponse {
  jobs: Job[];
  pagination: Pagination;
}

export type JobResponse = Job;

export interface DeleteJobResponse {
  message: string;
}
// Future-proof for when we include relations
export type JobWithCreator = Prisma.JobGetPayload<{
  include: {
    createdBy: true;
  };
}>;