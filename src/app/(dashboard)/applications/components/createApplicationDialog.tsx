"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import ApplicationForm from "./applicationForm";

interface Props {
   onSuccess: () => void;
}

export default function CreateApplicationDialog({
  onSuccess,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          Add Application
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create Application
          </DialogTitle>
        </DialogHeader>

        <ApplicationForm onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  );
}