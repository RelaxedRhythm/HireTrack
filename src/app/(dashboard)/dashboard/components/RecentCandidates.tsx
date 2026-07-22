"use client";

import { useEffect, useState } from "react";
import { User } from "lucide-react";

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

interface Candidate {
  id: string;
  name: string;
  email: string;
  status: string;
  createdAt: string;
  applications:{
    job: {
      title: string;
    };
  }
}

export function RecentCandidates() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCandidates() {
      try {
        const res = await fetch("/api/dashboard/recent-candidates");
        const data = await res.json();
        setCandidates(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCandidates();
  }, []);

  return (
    <Card className="border-border/40 bg-background/60 shadow-none">
      <CardHeader className="pb-3.5">
        <CardTitle className="text-base font-semibold tracking-tight">Recent Candidates</CardTitle>
        <CardDescription className="text-xs">
          Latest candidate applications
        </CardDescription>
      </CardHeader>

      <CardContent>
        {loading ? (
          <ListSkeleton />
        ) : candidates.length === 0 ? (
          <EmptyState title="No recent candidates" description="" />
        ) : (
          <div className="space-y-3.5">
            {candidates.map((candidate) => {
              const initials = candidate.name
                ? candidate.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)
                : "C";

              return (
                <div
                  key={candidate.id}
                  className="group flex items-center justify-between border-b border-border/30 pb-3 last:border-none last:pb-0"
                >
                  <div className="flex items-start gap-3 transition-transform duration-200 group-hover:translate-x-1">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-[10px] font-semibold text-secondary-foreground border border-border/50 mt-0.5">
                      {initials}
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold tracking-tight text-foreground">
                        {candidate.name}
                      </h4>

                      <p className="text-xs text-muted-foreground mt-0.5">
                        {candidate.email}
                      </p>

                      <p className="text-[10px] text-muted-foreground mt-0.5 font-medium">
                        Applied for {candidate.applications?.job?.title ?? "unknown"}
                      </p>

                      <p className="text-[10px] text-muted-foreground/60 mt-0.5">
                        {new Date(candidate.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <Badge
                    variant={
                      candidate.status === "HIRED"
                        ? "default"
                        : candidate.status === "REJECTED"
                          ? "destructive"
                          : "secondary"
                    }
                    className="text-[10px] h-4.5 px-1.5 uppercase font-semibold tracking-wider"
                  >
                    {candidate.status}
                  </Badge>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}