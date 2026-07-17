import { JobInput } from "./validations/jobs";

export const defaultJobValues: JobInput = {
  title: "",
  company: "",
  location: "",
  salary: "",
  description: "",
  type: "FULL_TIME",
  status: "OPEN",
};