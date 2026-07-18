import { z } from "zod";
import { ApplicationStatus } from "@prisma/client";

export const CreateApplicationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  resumeUrl: z.string().url().optional().or(z.literal("")),
});

export const UpdateApplicationSchema = z.object({
  status: z.nativeEnum(ApplicationStatus).optional(),
  notes: z.string().optional(),
  rating: z.number().int().min(1).max(5).optional(),
});

export type CreateApplicationInput = z.infer<typeof CreateApplicationSchema>;
export type UpdateApplicationInput = z.infer<typeof UpdateApplicationSchema>;