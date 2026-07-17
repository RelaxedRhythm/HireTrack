"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobStatus, JobType } from "@prisma/client";


interface FiltersProps {
  status: JobStatus | "all";
  type: JobType | "all";
  onStatusChange: (value: JobStatus | "all") => void;
  onTypeChange: (value: JobType | "all") => void;
}


export default function Filters({
  status,
  type,
  onStatusChange,
  onTypeChange,
}: FiltersProps) {


  return (
    <div className="flex flex-wrap gap-3">


      <Select
        value={status}
        onValueChange={onStatusChange}
      >

        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>


        <SelectContent>

          <SelectItem value="all">
            All Status
          </SelectItem>
 <SelectItem value={JobStatus.APPLIED}>
            Applied
          </SelectItem>


          <SelectItem value={JobStatus.INTERVIEW}>
            Interview
          </SelectItem>


          <SelectItem value={JobStatus.OFFER}>
            Offer
          </SelectItem>


          <SelectItem value={JobStatus.REJECTED}>
            Rejected
          </SelectItem>

          <SelectItem value={JobStatus.OPEN}>
            Open
          </SelectItem>

          <SelectItem value={JobStatus.CLOSED}>
            CLOSED
          </SelectItem>

          <SelectItem value={JobStatus.DRAFT}>
            DRAFT
          </SelectItem>


        </SelectContent>

      </Select>



      <Select
        value={type}
        onValueChange={onTypeChange}
      >

        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>


        <SelectContent>

          <SelectItem value="all">
            All Types
          </SelectItem>


          <SelectItem value={JobType.FULL_TIME}>
            Full Time
          </SelectItem>


          <SelectItem value={JobType.PART_TIME}>
            Part Time
          </SelectItem>


          <SelectItem value={JobType.INTERNSHIP}>
            Internship
          </SelectItem>


          <SelectItem value={JobType.CONTRACT}>
            Contract
          </SelectItem>




        </SelectContent>

      </Select>


    </div>
  );
}