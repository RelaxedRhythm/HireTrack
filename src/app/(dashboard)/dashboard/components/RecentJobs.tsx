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
    <Card className="border-border/40 bg-background/60 shadow-none">
      <CardHeader className="pb-3.5">
        <CardTitle className="text-base font-semibold tracking-tight">Recent Jobs</CardTitle>
        <CardDescription className="text-xs">
          Latest jobs created
        </CardDescription>
      </CardHeader>

      <CardContent>
        {loading ? (
          <ListSkeleton />
        ) : jobs.length === 0 ? (
          <EmptyState title="No Recent Jobs" description="Add new Jobs" />
        ) : (
          <div className="space-y-3.5">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="group flex items-center justify-between border-b border-border/30 pb-3 last:border-none last:pb-0"
              >
                <div className="flex items-start gap-3 transition-transform duration-200 group-hover:translate-x-1">
                  <div className="rounded-md border border-border/40 bg-secondary/30 p-1.5 mt-0.5 text-muted-foreground group-hover:text-primary group-hover:bg-secondary/60 transition-colors">
                    <Briefcase className="h-3.5 w-3.5" />
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold tracking-tight text-foreground">
                      {job.title}
                    </h4>

                    <p className="text-xs text-muted-foreground mt-0.5">
                      {job.company}
                    </p>

                    <p className="text-[10px] text-muted-foreground/60 mt-0.5">
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
                  className="text-[10px] h-4.5 px-1.5 uppercase font-semibold tracking-wider"
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