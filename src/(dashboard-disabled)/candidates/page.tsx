"use client";

import { useState } from "react";

import SearchBar from "../../app/components/shared/searchBar";
import CandidateList from "./components/candidateList";
import Pagination from "../../app/components/shared/pagination";

export default function CandidatesPage() {
  const [refresh, setRefresh] = useState(0);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
// const [debouncedSearch, setDebouncedSearch] = useState("");
// useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearch(search);
//     }, 400);

//     return () => clearTimeout(timer);
//   }, [search]);
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">Candidates</h1>

        <SearchBar
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }
        }
          placeholder="searching candidates"
        />
      </div>

      <CandidateList
        refresh={refresh}
        search={search}
        page={page}
        setTotalPages={setTotalPages}
      />

      <Pagination
        page={page}
        onPageChange={setPage}
        totalPages={totalPages}
      />
    </div>
  );
}