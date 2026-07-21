import { auth } from "@/auth";
import { getStats } from "@/app/api/dashboard/stats/route";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Briefcase,
  BriefcaseBusiness,
  Users,
  Calendar,
  BadgeCheck,
} from "lucide-react";
import { useState } from "react";
// import { JobStatus } from "@prisma/client";

export async function StatsCards() {
  const session = await auth();
  // const [loading,setLoading] =useState(true);

  if (!session?.user?.id) {
    return null;
  }

  const res = await getStats();
  console.log(res);
  const data = await res.json();
  console.log(data);
  const stats = [
    {
      title: "Total Jobs",
      value: data.totalJobs,
      icon: Briefcase,
    },
    {
      title: "Open Jobs",
      value: data.activeJobs,
      icon: BriefcaseBusiness,
    },
    {
      title: "Candidates",
      value: data.candidates,
      icon: Users,  
    },
    {
      title: "Interviews",
      value: data.interviews,
      icon: Calendar,
    },
    {
      title: "Hires",
      value: data.hires,
      icon: BadgeCheck,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>

              <Icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-3xl font-bold">
                {stat.value}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}