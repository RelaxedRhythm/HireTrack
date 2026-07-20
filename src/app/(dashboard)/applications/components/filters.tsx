"use client";

import { useEffect, useState } from "react";

import { ApplicationStatus } from "@prisma/client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Job {
  id: string;
  title: string;
}

interface FiltersProps {
  status: string;
  setStatus: (value: string) => void;

  jobId: string;
  setJobId: (value: string) => void;
}

export default function Filters({
  status,
  setStatus,
  jobId,
  setJobId,
}: FiltersProps) {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch("/api/jobs?limit=1000");

        if (!res.ok) return;

        const data = await res.json();

        setJobs(data.jobs);
      } catch (error) {
        console.error(error);
      }
    }

    fetchJobs();
  }, []);

  return (
    <div className="flex flex-wrap gap-4">
      <Select
        value={status}
        onValueChange={(value) => setStatus(value ?? "")}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Application Status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>

          {Object.values(ApplicationStatus).map((status) => (
            <SelectItem
              key={status}
              value={status}
            >
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={jobId}
        onValueChange={(value) => setStatus(value ?? "")}
      >
        <SelectTrigger className="w-[250px]">
          <SelectValue placeholder="All Jobs" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="">All Jobs</SelectItem>

          {jobs.map((job) => (
            <SelectItem
              key={job.id}
              value={job.id}
            >
              {job.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}