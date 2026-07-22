"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Briefcase,
  Mail,
  Star,
  FileText,
  MoreHorizontal,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

import type { Application } from "@/types/applications";

import EditApplicationDialog from "./editApplicationForm";
import DeleteApplicationDialog from "./deleteApplicationDialog";

interface Props {
  applications: Application[];
  setRefresh: React.Dispatch<React.SetStateAction<number>>;
}

export default function ApplicationFeed({
  applications,
  setRefresh,
}: Props) {
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  const [editOpen, setEditOpen] = useState(false);

  const [deleteApplication, setDeleteApplication] =
    useState<Application | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <div className="space-y-4">
        {applications.map((application) => (
          <Card
            key={application.id}
            className="transition-shadow hover:shadow-md"
          >
            <CardContent className="p-6">

              <div className="flex items-start justify-between">

                <div>

                  <div className="flex items-center gap-3">

                    <h3 className="text-lg font-semibold">
                      {application.candidate.name}
                    </h3>

                    <Badge>
                      {application.status}
                    </Badge>

                  </div>

                  <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {application.candidate.email}
                  </div>

                </div>

                <div className="flex gap-2">

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                      setSelectedApplication(application);
                      setEditOpen(true);
                    }}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>

                </div>

              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">

                <div>

                  <p className="text-xs uppercase text-muted-foreground">
                    Job
                  </p>

                  <Link
                    href={`/jobs/${application.job.id}`}
                    className="mt-1 flex items-center gap-2 font-medium hover:underline"
                  >
                    <Briefcase className="h-4 w-4" />
                    {application.job.title}
                  </Link>

                </div>

                <div>

                  <p className="text-xs uppercase text-muted-foreground">
                    Rating
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    {application.rating ?? "-"}
                  </div>

                </div>

                <div>

                  <p className="text-xs uppercase text-muted-foreground">
                    Notes
                  </p>

                  <div className="mt-1 flex items-start gap-2">
                    <FileText className="mt-0.5 h-4 w-4" />

                    <p className="line-clamp-2 text-sm">
                      {application.notes || "No notes"}
                    </p>

                  </div>

                </div>

              </div>

              <div className="mt-6 flex justify-end gap-2">

                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedApplication(application);
                    setEditOpen(true);
                  }}
                >
                  Edit
                </Button>

                <Button
                  variant="destructive"
                  onClick={() => {
                    setDeleteApplication(application);
                    setDeleteOpen(true);
                  }}
                >
                  Delete
                </Button>

              </div>

            </CardContent>
          </Card>
        ))}
      </div>

      {selectedApplication && (
        <EditApplicationDialog
          application={selectedApplication}
          open={editOpen}
          setOpen={setEditOpen}
          setRefresh={setRefresh}
        />
      )}

      {deleteApplication && (
        <DeleteApplicationDialog
          applicationId={deleteApplication.id}
          open={deleteOpen}
          setOpen={setDeleteOpen}
          setRefresh={setRefresh}
        />
      )}
    </>
  );
}