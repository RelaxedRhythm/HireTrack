"use client";

import { useState } from "react";

import SearchBar from "@/app/components/shared/searchBar";
import Pagination from "@/app/components/shared/pagination";

import CreateApplicationDialog from "./components/createApplicationDialog";
import ApplicationList from "./components/applicationList";
import Filters from "./components/filters";

export default function ApplicationsPage() {
  const [refresh, setRefresh] = useState(0);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [status, setStatus] = useState("");

  const [jobId, setJobId] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SearchBar
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          placeholder="Search applications..."
        />

        <CreateApplicationDialog
          onSuccess={() => setRefresh((r) => r + 1)}
        />
      </div>

      <Filters
        status={status}
        setStatus={setStatus}
        jobId={jobId}
        setJobId={setJobId}
      />

      <ApplicationList
        refresh={refresh}
        setRefresh={setRefresh}
        search={search}
        page={page}
        status={status}
        jobId={jobId}
        setTotalPages={setTotalPages}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}