"use client";

import { cn } from "@/lib/utils";
import EditJobDialog from "./editJobDialog";
import DeleteJobDialog from "./deleteJobDialog";
import type { Job } from "@/types/job";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/app/components/shared/emptyState";
// import { TableSkeleton } from "@/app/components/shared/tableSkeleton";
import { MapPin, Clock, Users, Building2, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface JobsTableProps {
  jobs: Job[];
  onRefresh?: () => void;
  loading: boolean;
}

export default function JobsTable({
  jobs,
  onRefresh,
  loading,
}: JobsTableProps) {
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-44 rounded-xl border border-border/40 bg-muted/20 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!jobs.length) {
    return (
      <EmptyState
        title="No recent jobs"
        description="Jobs you create will appear here."
      />
    );
  }

  function getStatusBadge(status: string) {
    switch (status) {
      case "OPEN":
        return "bg-green-100 text-green-700 border-green-200 hover:bg-green-100";

      case "DRAFT":
        return "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-100";

      case "CLOSED":
        return "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-100";

      default:
        return "";
    }
  }

  return (
    <div className="grid gap-4 xl:grid-cols-3 lg:grid-cols-2">
      {jobs.map((job) => {
        const appCount = job.applications?.length ?? 0;

        return (
          <div
            key={job.id}
            className="group flex flex-col justify-between rounded-xl border border-border/40 bg-card p-6 min-h-[250px]  transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold leading-6 tracking-tight text-foreground group-hover:text-primary transition-colors">
                    {job.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground font-medium">
                    <Building2 className="h-3.5 w-3.5 shrink-0" />
                    <span>{job.company}</span>
                  </div>
                </div>

                <Badge
                  className={cn(
                    "rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider",
                    getStatusBadge(job.status),
                  )}
                >
                  {job.status}
                </Badge>
              </div>

              <div className="mt-6 space-y-3 gap-2 border-t border-border/30 pt-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground/60" />
                  <span className="truncate">{job.location || "Remote"}</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                  <Clock className="h-3.5 w-3.5 shrink-0 text-muted-foreground/60" />
                  <span className="truncate">{job.type.replace("_", " ")}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-border/30 pt-3.5">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-semibold">
                <div className="rounded-md bg-secondary/60 p-1 text-primary shrink-0">
                  <Users className="h-3.5 w-3.5" />
                </div>
                <span>
                  {appCount} {appCount === 1 ? "Applicant" : "Applicants"}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                 <Link
                    href={`/jobs/${job.id}`}
                    className="inline-flex items-center gap-1"
                  >
                <Button size="xs" variant="outline">
                 
                    <Eye className="h-3 w-3" />
                    <span>View</span>
                </Button>
                  </Link>

                <EditJobDialog job={job} onSuccess={onRefresh} />

                <DeleteJobDialog jobId={job.id} onSuccess={onRefresh} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
