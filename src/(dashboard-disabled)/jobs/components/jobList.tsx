"use client";

import { useEffect, useState,useCallback } from "react";

interface JobListProps {
  refresh: number;
  search: string;
  status: string;
  type: string;
}

import type {Job} from "../../../types/job"

export default function JobList({search,
  status,
  type,}:JobListProps) {

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);


  const fetchJobs=useCallback(async () =>{

    try {
    setLoading(true);
    const params =new URLSearchParams();
    if(search){
        params.append("search",search);
    }

    if(status !=="all"){
        params.append("status",status);
    }

    if (type !== "all") {
      params.append("type", type);
    }
      const response = await fetch(`/api/jobs?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }


      const data = await response.json();

      setJobs(data.jobs);

    } catch(error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  },[search,status,type]);


  useEffect(() => {
     const load = async () => {
        await fetchJobs();
    };

    load();
  }, [fetchJobs]);



  if (loading) {
    return (
      <div>
        Loading jobs...
      </div>
    );
  }



  if (jobs.length === 0) {
    return (
      <div>
        No jobs found
      </div>
    );
  }



  return (
    <div className="space-y-4">

      {jobs.map((job) => (

        <div
          key={job.id}
          className="rounded-lg border p-5"
        >

          <h2 className="text-xl font-semibold">
            {job.title}
          </h2>


          <p className="text-muted-foreground">
            {job.company}
          </p>


          <p>
            Location: {job.location}
          </p>


          <p>
            Type: {job.type}
          </p>


          <p>
            Status: {job.status}
          </p>


          {job.salary && (
            <p>
              Salary: {job.salary}
            </p>
          )}


          {job.description && (
            <p className="mt-2">
              {job.description}
            </p>
          )}

        </div>

      ))}

    </div>
  );
}