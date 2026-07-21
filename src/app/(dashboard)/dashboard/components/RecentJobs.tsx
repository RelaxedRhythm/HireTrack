"use client";

import { useEffect, useState } from "react";
import { Briefcase } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { ListSkeleton } from "./skeletons/listSkeleton";
import { EmptyState } from "@/app/components/shared/emptyState";

interface Job {
  id: string;
  title: string;
  company: string;
  status: string;
  createdAt: string;
}

export function RecentJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch("/api/dashboard/recent-jobs");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Jobs</CardTitle>
        <CardDescription>
          Latest jobs created
        </CardDescription>
      </CardHeader>

      <CardContent>
        {loading ? (
          <ListSkeleton/>
        ) : jobs.length === 0 ? (
          <EmptyState title="No Recent Jobs " description="Add new Jobs"/>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between border-b pb-3 last:border-none"
              >
                <div className="flex items-start gap-3">
                  <Briefcase className="mt-1 h-5 w-5 text-muted-foreground" />

                  <div>
                    <h4 className="font-medium">
                      {job.title}
                    </h4>

                    <p className="text-sm text-muted-foreground">
                      {job.company}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <Badge
                  variant={
                    job.status === "OPEN"
                      ? "default"
                      : job.status === "DRAFT"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {job.status}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}