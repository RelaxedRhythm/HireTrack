"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import ApplicationForm from "./applicationForm";

import type { Application } from "@/types/applications";

interface Props {
  application: Application;

  open: boolean;

  setOpen: (value: boolean) => void;

  setRefresh: React.Dispatch<React.SetStateAction<number>>;
}

export default function EditApplicationDialog({
  application,
  open,
  setOpen,
  setRefresh,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Application</DialogTitle>
        </DialogHeader>

        <ApplicationForm
          initialData={{
            id: application.id,
            candidateId: application.candidate.id,
            jobId: application.job.id,
            status: application.status,
            notes: application.notes,
            rating: application.rating,
            candidate: {
              name: application.candidate.name,
            },

            job: {
              title: application.job.title,
            },
          }}
          onSuccess={() => {
            setRefresh((prev) => prev + 1);
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
