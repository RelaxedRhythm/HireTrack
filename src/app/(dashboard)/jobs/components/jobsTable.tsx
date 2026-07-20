"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";

import EditJobDialog from "./editJobDialog";
import DeleteJobDialog from "./deleteJobDialog";
import type { Job } from "@/types/job";


interface JobsTableProps {
  jobs: Job[];
  onRefresh?: () => void;
}


export default function JobsTable({
  jobs,
  onRefresh,
}: JobsTableProps) {


  if (!jobs.length) {
    return (
      <div className="rounded-md border p-8 text-center text-muted-foreground">
        No jobs found.
      </div>
    );
  }


  return (
    <div className="rounded-md border">

      <Table>

        <TableHeader>

          <TableRow>

            <TableHead>
              Title
            </TableHead>

            <TableHead>
              Company
            </TableHead>

            <TableHead>
              Location
            </TableHead>

            <TableHead>
              Type
            </TableHead>

            <TableHead>
              Status
            </TableHead>

            <TableHead className="text-right">
              Actions
            </TableHead>

          </TableRow>

        </TableHeader>


        <TableBody>

          {jobs.map((job) => (

            <TableRow key={job.id}>


              <TableCell className="font-medium">
                {job.title}
              </TableCell>


              <TableCell>
                {job.company}
              </TableCell>


              <TableCell>
                {job.location}
              </TableCell>


              <TableCell>
                {job.type}
              </TableCell>


              <TableCell>
                {job.status}
              </TableCell>


              <TableCell className="text-right">

                <div className="flex justify-end gap-2">

                  <EditJobDialog
                    job={job}
                    onSuccess={onRefresh}
                  />


                  <DeleteJobDialog
                    jobId={job.id}
                    onSuccess={onRefresh}
                  />

                </div>

              </TableCell>


            </TableRow>

          ))}


        </TableBody>

      </Table>

    </div>
  );
}