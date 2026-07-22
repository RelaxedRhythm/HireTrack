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

import { JobInput } from "@/lib/validations/jobs";

interface CreateJobDialogProps {
  onSuccess?: () => void;
  onCreated?:() => void;
}

export default function CreateJobDialog({
  onSuccess, onCreated
}: CreateJobDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  async function handleCreate(data: JobInput) {
    try {
      setIsSubmitting(true);

      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });


      if (!response.ok) {
        throw new Error("Failed to create job");
      }
      onCreated?.();

      setOpen(false);

      onSuccess?.();

    } catch (error) {
      console.error("Create job error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }


  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger render={<Button />}>
        Create Job
      </DialogTrigger>


      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">

        <DialogHeader>
          <DialogTitle>
            Create Job
          </DialogTitle>
        </DialogHeader>


        <JobForm
          onSubmit={handleCreate}
          isSubmitting={isSubmitting}
          submitLabel="Create Job"
        />


      </DialogContent>
    </Dialog>
  );
}