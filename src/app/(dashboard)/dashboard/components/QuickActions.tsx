"use client";

import Link from "next/link";
import {
  Briefcase,
//   PlusCircle,
  Settings,
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
    title: "Manage Jobs",
    description: "Post and organize job openings",
    href: "/jobs",
    icon: Briefcase,
  },
  {
    title: "Candidates Directory",
    description: "Browse and preview CRM profiles",
    href: "/candidates",
    icon: Users,
  },
  {
    title: "Applications Workflow",
    description: "Track hiring stages and pipeline",
    href: "/applications",
    icon: ClipboardList,
  },
  {
    title: "System Settings",
    description: "Configure options and security",
    href: "/settings",
    icon: Settings,
  },
];

export function QuickActions() {
  return (
    <Card className="border-border/40 bg-background/60 shadow-none">
      <CardHeader className="pb-3.5">
        <CardTitle className="text-base font-semibold tracking-tight">Quick Actions</CardTitle>
        <CardDescription className="text-xs">
          Frequently used shortcuts
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-3.5 sm:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link key={action.title} href={action.href} className="group outline-none">
              <Button
                variant="outline"
                className="h-auto w-full justify-between p-3.5 border-border/40 hover:border-border/80 hover:bg-muted/40 transition-all duration-200"
              >
                <div className="flex items-center gap-3 text-left">
                  <div className="rounded-md border border-border/40 bg-secondary/30 p-1.5 text-muted-foreground group-hover:text-primary group-hover:bg-secondary/60 transition-colors">
                    <Icon className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold tracking-tight text-foreground">
                      {action.title}
                    </p>

                    <p className="text-xs text-muted-foreground mt-0.5 font-normal">
                      {action.description}
                    </p>
                  </div>
                </div>

                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all duration-200" />
              </Button>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}