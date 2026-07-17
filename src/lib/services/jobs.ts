import { JobInput } from "@/lib/validations/jobs";
import { DeleteJobResponse, JobFilters, JobResponse, JobsResponse } from "@/types/job";


export async function getJobs(query: JobFilters = {}): Promise<JobsResponse> {
  const params = new URLSearchParams();

  if (query.page) params.set("page", query.page.toString());
  if (query.limit) params.set("limit", query.limit.toString());
  if (query.search) params.set("search", query.search);
  if (query.status) params.set("status", query.status);
  if (query.type) params.set("type", query.type);
  if (query.sort) params.set("sort", query.sort);
  if (query.order) params.set("order", query.order);

  const res = await fetch(`/api/jobs?${params.toString()}`);

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  return (await res.json()) as JobsResponse;
}

export async function getJob(id: string) :Promise<JobResponse>{
  const res = await fetch(`/api/jobs/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch job");
  }

  return (await res.json()) as JobsResponse;
}

export async function createJob(data: JobInput): Promise<JobResponse>{
  const res = await fetch("/api/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw await res.json();
  }

  return (await res.json()) as JobResponse;
}

export async function updateJob(
  id: string,
  data: JobInput
):Promise<JobResponse> {
  const res = await fetch(`/api/jobs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw await res.json();
  }

  return (await res.json()) as JobResponse;
}

export async function deleteJob(id: string): Promise<DeleteJobResponse>{
  const res = await fetch(`/api/jobs/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw await res.json();
  }

  return(await res.json()) as DeleteJobResponse;
}