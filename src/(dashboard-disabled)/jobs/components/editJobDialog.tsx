"use client";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import JobForm from "./jobForm";

import type { JobInput } from "@/lib/validations/jobs";

import type { Job } from "@/types/job";

type EditableJob = Pick<
  Job,
  "id" | "title" | "company" | "location" | "type" | "status" | "description"
>;

interface EditJobDialogProps {
  job: EditableJob;
  onSuccess?: () => void;
}


export default function EditJobDialog({
  job,
  onSuccess,
}: EditJobDialogProps) {

  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  async function handleUpdate(data: JobInput) {

    try {
      setIsSubmitting(true);


      const response = await fetch(`/api/jobs/${job.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });


      if (!response.ok) {
        throw new Error("Failed to update job");
      }


      setOpen(false);

      onSuccess?.();


    } catch (error) {
      console.error("Update job error:", error);

    } finally {
      setIsSubmitting(false);
    }
  }


  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >

      <DialogTrigger render={<Button variant="outline" />}>
        Edit
      </DialogTrigger>


      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">

        <DialogHeader>
          <DialogTitle>
            Edit Job
          </DialogTitle>
        </DialogHeader>


        <JobForm
          defaultValues={{
            title: job.title,
            company: job.company,
            location: job.location ?? "",
            type: job.type as JobInput["type"],
            status: job.status as JobInput["status"],
            description: job.description ?? "",
          }}
          onSubmit={handleUpdate}
          isSubmitting={isSubmitting}
          submitLabel="Update Job"
        />


      </DialogContent>

    </Dialog>
  );
}