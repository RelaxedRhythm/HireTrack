"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { Application } from "@/types/applications";
import EditApplicationDialog from "./editApplicationForm";
import DeleteApplicationDialog from "./deleteApplicationDialog";

interface ApplicationsTableProps {
  applications: Application[];
  refresh: () => void;
}

export default function ApplicationsTable({
  applications,
  refresh,
}: ApplicationsTableProps) {
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  const [editOpen, setEditOpen] = useState(false);

  const [deleteApplication, setDeleteApplication] =
    useState<Application | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  function handleEdit(application: Application) {
    setSelectedApplication(application);
    setEditOpen(true);
  }

  function handleDelete(application: Application) {
    setDeleteApplication(application);
    setDeleteOpen(true);
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead>Job</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {applications.map((application) => (
              <TableRow key={application.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {application.candidate.name}
                    </span>

                    <span className="text-sm text-muted-foreground">
                      {application.candidate.email}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <Link
                    href={`/jobs/${application.job.id}`}
                    className="hover:underline"
                  >
                    {application.job.title}
                  </Link>
                </TableCell>

                <TableCell>
                  <Badge variant="outline">{application.status}</Badge>
                </TableCell>

                <TableCell>{application.rating ?? "-"}</TableCell>

                <TableCell className="max-w-xs truncate">
                  {application.notes || "-"}
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(application)}
                    >
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(application)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {selectedApplication && (
        <EditApplicationDialog
          application={selectedApplication}
          open={editOpen}
          setOpen={setEditOpen}
          refresh={refresh}
        />
      )}
      {deleteApplication && (
        <DeleteApplicationDialog
          applicationId={deleteApplication.id}
          open={deleteOpen}
          setOpen={setDeleteOpen}
          refresh={refresh}
        />
      )}
    </>
  );
}
