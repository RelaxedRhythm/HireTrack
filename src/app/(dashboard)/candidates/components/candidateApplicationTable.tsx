"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import type { Application } from "@/types/applications";

interface CandidateApplicationsTableProps {
  applications: (Application & {
    job: {
      id: string;
      title: string;
      company: string;
    };
  })[];
}

export default function CandidateApplicationsTable({
  applications,
}: CandidateApplicationsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Notes</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applications.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-24 text-center"
              >
                No applications found.
              </TableCell>
            </TableRow>
          ) : (
            applications.map((application) => (
              <TableRow key={application.id}>
                <TableCell className="font-medium">
                  {application.job.title}
                </TableCell>

                <TableCell>
                  {application.job.company}
                </TableCell>

                <TableCell>
                  <Badge variant="outline">
                    {application.status}
                  </Badge>
                </TableCell>

                <TableCell>
                  {application.rating ?? "-"}
                </TableCell>

                <TableCell className="max-w-sm truncate">
                  {application.notes || "-"}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}