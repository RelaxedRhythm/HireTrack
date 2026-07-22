"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ApplicationStatus } from "@/lib/constants/application";

export interface ApplicationData {
  id?: string;
  candidateId: string;
  jobId: string;
  status: ApplicationStatus;
  notes?: string | null;
  rating?: number | null;

  candidate?: {
    name: string;
  };

  job?: {
    title: string;
  };
}

interface Props {
  initialData?: ApplicationData;
  onSuccess?: () => void;
}

export default function ApplicationForm({ initialData, onSuccess }: Props) {
  const [candidateId, setCandidateId] = useState(
    initialData?.candidateId ?? "",
  );

  const [jobId, setJobId] = useState(initialData?.jobId ?? "");

  const [status, setStatus] = useState<ApplicationStatus>(
    initialData?.status ?? ApplicationStatus.APPLIED,
  );

  const [notes, setNotes] = useState(initialData?.notes ?? "");

  const [rating, setRating] = useState(
    initialData?.rating ? String(initialData.rating) : "",
  );

  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(initialData?.id);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        isEdit ? `/api/applications/${initialData?.id}` : "/api/applications",
        {
          method: isEdit ? "PATCH" : "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            candidateId,
            jobId,
            status,

            notes: notes || null,

            rating: rating ? Number(rating) : null,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      onSuccess?.();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isEdit ? (
        <Input value={initialData?.candidate?.name ?? ""} disabled />
      ) : (
        <Input
          placeholder="Candidate ID"
          value={candidateId}
          onChange={(e) => setCandidateId(e.target.value)}
        />
      )}

      {isEdit ? (
        <Input value={initialData?.job?.title ?? ""} disabled />
      ) : (
        <Input
          placeholder="Job ID"
          value={jobId}
          onChange={(e) => setJobId(e.target.value)}
        />
      )}

      <select
        className="border rounded-md p-2 w-full"
        value={status}
        onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
      >
        {Object.values(ApplicationStatus).map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <Input
        type="number"
        placeholder="Rating"
        min="0"
        max="10"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />

      <Input
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <Button disabled={loading} type="submit">
        {loading
          ? "Saving..."
          : isEdit
            ? "Update Application"
            : "Create Application"}
      </Button>
    </form>
  );
}
