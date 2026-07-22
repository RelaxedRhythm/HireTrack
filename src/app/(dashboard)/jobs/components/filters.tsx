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
        onValueChange={(value) => onStatusChange((value ?? "all") as JobStatus | "all")}
      >

        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>


        <SelectContent className="bg-background/100 backdrop-blur-none border shadow-xl z-50">

          <SelectItem value="all">
            All Status
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
        onValueChange={(value) => onTypeChange((value ?? "all") as JobType | "all")}
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