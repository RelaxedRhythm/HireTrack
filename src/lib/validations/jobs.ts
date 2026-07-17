import { z } from "zod";

export const JobSchema = z.object({
  title: z.string().trim().min(3,"Title must be atleast 3 characters").max(100),
  company: z.string().trim().min(2,"Company name is required").max(100),
  location: z.string().trim()
    .max(100).optional(),
  salary: z.string().trim()
    .max(50).optional(),
  description: z.string().trim()
    .max(5000).optional(),

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