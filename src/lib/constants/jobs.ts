export const JobStatus = {
  OPEN: "OPEN",
  CLOSED: "CLOSED",
  DRAFT: "DRAFT",
} as const;

export type JobStatus = (typeof JobStatus)[keyof typeof JobStatus];

export const JobType = {
  FULL_TIME: "FULL_TIME",
  PART_TIME: "PART_TIME",
  INTERNSHIP: "INTERNSHIP",
  CONTRACT: "CONTRACT",
  REMOTE: "REMOTE",
} as const;

export type JobType = (typeof JobType)[keyof typeof JobType];