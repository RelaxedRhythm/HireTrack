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
  job: {
    title: string;
  };
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
    <Card>
      <CardHeader>
        <CardTitle>Recent Candidates</CardTitle>
        <CardDescription>
          Latest candidate applications
        </CardDescription>
      </CardHeader>

      <CardContent>
        {loading ? (
          <ListSkeleton/>
        ) : candidates.length === 0 ? (
          <EmptyState title="No recent candidates" description=""/>
        ) : (
          <div className="space-y-4">
            {candidates.map((candidate) => (
              <div
                key={candidate.id}
                className="flex items-center justify-between border-b pb-3 last:border-none"
              >
                <div className="flex items-start gap-3">
                  <User className="mt-1 h-5 w-5 text-muted-foreground" />

                  <div>
                    <h4 className="font-medium">
                      {candidate.name}
                    </h4>

                    <p className="text-sm text-muted-foreground">
                      {candidate.email}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Applied for {candidate.job.title}
                    </p>

                    <p className="text-xs text-muted-foreground">
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
                >
                  {candidate.status}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}