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
  refresh: () => void;
}

export default function CreateApplicationDialog({
  refresh,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
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

        <ApplicationForm refresh={refresh} />
      </DialogContent>
    </Dialog>
  );
}