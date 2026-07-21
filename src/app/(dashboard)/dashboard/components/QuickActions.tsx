"use client";

import Link from "next/link";
import {
  Briefcase,
  PlusCircle,
  Users,
  ClipboardList,
  ArrowRight,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

const actions = [
  {
    title: "Create Job",
    description: "Post a new job opening",
    href: "/dashboard/jobs/new",
    icon: PlusCircle,
  },
  {
    title: "View Jobs",
    description: "Manage all job postings",
    href: "/dashboard/jobs",
    icon: Briefcase,
  },
  {
    title: "Candidates",
    description: "Browse candidate profiles",
    href: "/dashboard/candidates",
    icon: Users,
  },
  {
    title: "Applications",
    description: "Review submitted applications",
    href: "/dashboard/applications",
    icon: ClipboardList,
  },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Frequently used shortcuts
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4 sm:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link key={action.title} href={action.href}>
              <Button
                variant="outline"
                className="h-auto w-full justify-between p-4"
              >
                <div className="flex items-center gap-3 text-left">
                  <Icon className="h-5 w-5" />

                  <div>
                    <p className="font-medium">
                      {action.title}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {action.description}
                    </p>
                  </div>
                </div>

                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}