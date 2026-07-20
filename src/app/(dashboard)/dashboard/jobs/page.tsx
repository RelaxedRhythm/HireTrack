import { auth } from "@/auth";
import { redirect } from "next/navigation";
import JobsTable from "@/app/(dashboard)/jobs/components/jobsTable";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
    type?: string;
    sort?: string;
    order?: string;
  }>;
}

async function getJobs(searchParams: Awaited<PageProps["searchParams"]>) {
  const params = new URLSearchParams();

  if (searchParams.page) params.set("page", searchParams.page);
  if (searchParams.search) params.set("search", searchParams.search);
  if (searchParams.status) params.set("status", searchParams.status);
  if (searchParams.type) params.set("type", searchParams.type);
  if (searchParams.sort) params.set("sort", searchParams.sort);
  if (searchParams.order) params.set("order", searchParams.order);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/jobs?${params.toString()}`,
    {
      cache: "no-store",
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  return res.json();
}

export default async function JobsPage({
  searchParams,
}: PageProps) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const params = await searchParams;

  const data = await getJobs(params);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Jobs
          </h1>

          <p className="text-muted-foreground">
            Manage all your job postings.
          </p>
        </div>
      </div>

      <JobsTable
        jobs={data.jobs}
        // pagination={data.pagination}
      />
    </div>
  );
}