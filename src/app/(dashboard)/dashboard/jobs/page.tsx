import { auth } from "@/auth";
import { redirect } from "next/navigation";
import JobsTable from "@/app/(dashboard)/jobs/components/jobsTable";
import { getJobs } from "@/lib/services/jobs";

// interface PageProps {
//   searchParams: Promise<{
//     page?: string;
//     search?: string;
//     status?: string;
//     type?: string;
//     sort?: string;
//     order?: string;
//   }>;
// }


export default async function JobsPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const data = await getJobs();

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