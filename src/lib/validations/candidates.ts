import { z } from "zod";

export const CandidateSchema = z.object({
  name: z.string().min(2),

  email: z.string().email(),

  phone: z.string().optional(),

  resumeUrl: z.string().url().optional().or(z.literal("")),

});

export type CandidateFormData = z.infer<typeof CandidateSchema>;