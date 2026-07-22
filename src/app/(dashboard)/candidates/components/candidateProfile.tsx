"use client";

import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { Candidate } from "@/types/candidates";

interface CandidateProfileProps {
  candidate: Candidate;
}

export default function CandidateProfile({
  candidate,
}: CandidateProfileProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{candidate.name}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Email
          </p>
          <p>{candidate.email}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Phone
          </p>
          <p>{candidate.phone || "-"}</p>
        </div>

        <div className="flex gap-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Resume
            </p>

            {candidate.resumeUrl ? (
              <Link
                href={candidate.resumeUrl}
                target="_blank"
                className="text-primary hover:underline"
              >
                View Resume
              </Link>
            ) : (
              "-"
            )}
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">
              LinkedIn
            </p>

            {candidate.linkedinUrl ? (
              <Link
                href={candidate.linkedinUrl}
                target="_blank"
                className="text-primary hover:underline"
              >
                View Profile
              </Link>
            ) : (
              "-"
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}