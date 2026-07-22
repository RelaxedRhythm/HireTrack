export const ApplicationStatus = {
 APPLIED:"APPLIED",
  SCREENING:"SCREENING",
  INTERVIEW:"INTERVIEW",
  OFFER:"OFFER",
  HIRED:"HIRED",
  REJECTED:"REJECTED"
} as const;

export const Role ={
    ADMIN: "ADMIN",
    RECRUITER: "RECRUITER",
}
export type Role = (typeof Role)[keyof typeof Role];

export type ApplicationStatus = (typeof ApplicationStatus)[keyof typeof ApplicationStatus];