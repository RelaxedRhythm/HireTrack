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
          <Card 
            key={stat.title} 
            className="transition-all duration-300 hover:border-border/80 hover:shadow-xs border-border/40 bg-background/60"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-1 pt-4 px-4.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
                {stat.title}
              </span>

              <Icon className="h-4 w-4 text-muted-foreground/70" />
            </CardHeader>

            <CardContent className="pb-4 pt-0 px-4.5">
              <div className="text-2xl font-bold tracking-tight">
                {stat.value}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}