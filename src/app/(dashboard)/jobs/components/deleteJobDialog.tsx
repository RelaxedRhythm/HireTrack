"use client";

import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";


interface DeleteJobDialogProps {
  jobId: string;
  onSuccess?: () => void;
}


export default function DeleteJobDialog({
  jobId,
  onSuccess,
}: DeleteJobDialogProps) {

  const [isDeleting, setIsDeleting] = useState(false);


  async function handleDelete() {

    try {
      setIsDeleting(true);


      const response = await fetch(`/api/jobs/${jobId}`, {
        method: "DELETE",
      });


      if (!response.ok) {
        throw new Error("Failed to delete job");
      }


      onSuccess?.();


    } catch (error) {
      console.error("Delete job error:", error);

    } finally {
      setIsDeleting(false);
    }
  }


  return (
    <AlertDialog>

      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          size="sm"
        >
          Delete
        </Button>
      </AlertDialogTrigger>


      <AlertDialogContent>

        <AlertDialogHeader>

          <AlertDialogTitle>
            Delete Job?
          </AlertDialogTitle>


          <AlertDialogDescription>
            This action cannot be undone. 
            This will permanently remove this job posting.
          </AlertDialogDescription>

        </AlertDialogHeader>


        <AlertDialogFooter>

          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>


          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>

        </AlertDialogFooter>


      </AlertDialogContent>

    </AlertDialog>
  );
}