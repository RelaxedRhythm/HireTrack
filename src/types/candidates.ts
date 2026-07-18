// import type { Job, CandidateStatus } from "@prisma/client";
import { ApplicationWithJob } from "./applications";

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  resumeUrl?: string | null;
  linkedinUrl?: string | null
   _count?: {
    applications: number;
  };
}

export interface CandidateDetails extends Candidate {
  applications: ApplicationWithJob[];
}