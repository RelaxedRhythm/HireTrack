"use client";

import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import type { Candidate } from "@/types/candidates";
import { EmptyState } from "@/app/components/shared/emptyState";
import { TableSkeleton } from "@/app/components/shared/tableSkeleton";

interface CandidatesTableProps {
  candidates: Candidate[];
  loading:boolean
}

export default function CandidatesTable({
  candidates,loading
}: CandidatesTableProps) {
  if(loading){
    return (
      <TableSkeleton/>
    )
  }
  if (candidates.length === 0) {
    return (
      <EmptyState title="No Candidates Found"/>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Applications</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>LinkedIn</TableHead>
            <TableHead className="w-[120px] text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {candidates.map((candidate) => (
            <TableRow key={candidate.id}>
              <TableCell className="font-medium">
                {candidate.name}
              </TableCell>

              <TableCell>{candidate.email}</TableCell>

              <TableCell>
                {candidate.phone || "-"}
              </TableCell>

              <TableCell>
                {candidate._count?.applications ?? 0}
              </TableCell>

              <TableCell>
                {candidate.resumeUrl ? (
                  <Link
                    href={candidate.resumeUrl}
                    target="_blank"
                    className="text-primary hover:underline"
                  >
                    Resume
                  </Link>
                ) : (
                  "-"
                )}
              </TableCell>

              <TableCell>
                {candidate.linkedinUrl ? (
                  <Link
                    href={candidate.linkedinUrl}
                    target="_blank"
                    className="text-primary hover:underline"
                  >
                    LinkedIn
                  </Link>
                ) : (
                  "-"
                )}
              </TableCell>

              <TableCell className="text-right">
                <Button
                  // asChild
                  variant="outline"
                  size="sm"
                >
                  <Link href={`/candidates/${candidate.id}`} >
                  View </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}