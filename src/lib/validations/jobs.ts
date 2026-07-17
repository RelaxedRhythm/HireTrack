import { z } from "zod";

export const JobSchema = z.object({
  title: z.string().min(3),
  company: z.string().min(2),
  location: z.string().optional(),
  salary: z.string().optional(),
  description: z.string().optional(),

  type: z.enum([
    "FULL_TIME",
    "PART_TIME",
    "INTERNSHIP",
    "CONTRACT",
    "REMOTE",
  ]),

  status: z.enum([
    "OPEN",
    "CLOSED",
    "DRAFT",
  ]),
});

export type JobInput = z.infer<typeof JobSchema>;