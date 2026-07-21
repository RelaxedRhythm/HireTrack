import Link from "next/link";
import { notFound } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import EditJobDialog from "../components/editJobDialog";
import DeleteJobDialog from "../components/deleteJobDialog";

import { getJob } from "@/lib/services/jobs";
// import type { Job } from "@/types/job";

interface JobDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

// async function getJob(id: string): Promise<Job | null> {

//     const cookieStore = await cookies();

//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_APP_URL}/api/jobs/${id}`,
//     {
//       cache: "no-store",
//       headers: {
//         Cookie: cookieStore.toString(),
//       },
//     },
//   );

//   if (!response.ok) {
//     return null;
//   }

//   return response.json();
// }

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const { id } = await params;

  const job = await getJob(id);

  if (!job) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/jobs" />}
        >
          ← Back
        </Button>

        <div className="flex gap-2">
          <EditJobDialog job={job} />

          <DeleteJobDialog jobId={job.id} />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{job.title}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Company</p>

            <p className="font-medium">{job.company}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Location</p>

            <p className="font-medium">{job.location}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Type</p>

            <p className="font-medium">{job.type}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Status</p>

            <p className="font-medium">{job.status}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Description</p>

            <p className="whitespace-pre-wrap">
              {job.description || "No description provided"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
