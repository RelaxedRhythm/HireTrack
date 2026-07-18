// import type { Job, CandidateStatus } from "@prisma/client";

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  resumeUrl?: string | null;
}
