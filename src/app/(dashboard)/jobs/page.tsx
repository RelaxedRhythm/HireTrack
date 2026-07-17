"use client";

import { useEffect, useState } from "react";

import CreateJobDialog from "./components/createJobDialog";
import JobsTable from "./components/jobsTable";
import SearchBar from "./components/searchBar";
import Filters from "./components/filters";
import Pagination from "./components/pagination";
import { JobStatus, JobType } from "@prisma/client";


interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: JobType;
  status: JobStatus;
  description?: string | null;
}


export default function JobsPage() {

  const [jobs, setJobs] = useState<Job[]>([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [type, setType] = useState("all");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);



  async function fetchJobs() {

    try {

      setLoading(true);


      const params = new URLSearchParams({
        page: page.toString(),
        search,
        status,
        type,
      });


      const response = await fetch(
        `/api/jobs?${params.toString()}`
      );


      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }


      const data = await response.json();


      setJobs(data.jobs);
      setTotalPages(data.totalPages);


    } catch (error) {

      console.error(
        "Fetch jobs error:",
        error
      );

    } finally {

      setLoading(false);

    }
  }



  useEffect(() => {

    fetchJobs();

  }, [
    page,
    search,
    status,
    type,
  ]);



  function handleFilterChange(
    callback: (value: string) => void
  ) {

    return (value: string) => {

      setPage(1);

      callback(value);

    };

  }



  return (

    <div className="space-y-6">


      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-2xl font-bold">
            Jobs
          </h1>


          <p className="text-muted-foreground">
            Manage your job applications
          </p>

        </div>


        <CreateJobDialog
          onSuccess={fetchJobs}
        />

      </div>



      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">


        <SearchBar
          value={search}
          onChange={(value) => {

            setPage(1);
            setSearch(value);

          }}
        />


        <Filters

          status={status}

          type={type}

          onStatusChange={
            handleFilterChange(setStatus)
          }

          onTypeChange={
            handleFilterChange(setType)
          }

        />


      </div>




      {
        loading ? (

          <div className="text-center py-10">
            Loading jobs...
          </div>

        ) : (

          <JobsTable
            jobs={jobs}
            onRefresh={fetchJobs}
          />

        )
      }




      <Pagination

        page={page}

        totalPages={totalPages}

        onPageChange={setPage}

      />


    </div>

  );
}