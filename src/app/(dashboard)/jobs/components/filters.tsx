"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


interface FiltersProps {
  status: string;
  type: string;
  onStatusChange: (value: string) => void;
  onTypeChange: (value: string) => void;
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

          <SelectItem value="APPLIED">
            Applied
          </SelectItem>

          <SelectItem value="INTERVIEW">
            Interview
          </SelectItem>

          <SelectItem value="OFFER">
            Offer
          </SelectItem>

          <SelectItem value="REJECTED">
            Rejected
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


          <SelectItem value="FULL_TIME">
            Full Time
          </SelectItem>


          <SelectItem value="PART_TIME">
            Part Time
          </SelectItem>


          <SelectItem value="INTERNSHIP">
            Internship
          </SelectItem>


          <SelectItem value="CONTRACT">
            Contract
          </SelectItem>


        </SelectContent>

      </Select>


    </div>
  );
}