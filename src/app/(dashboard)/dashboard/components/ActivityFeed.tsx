"use client";

import { useEffect, useState } from "react";
import {
  Briefcase,
  Pencil,
  UserPlus,
  CheckCircle,
  CalendarDays,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ListSkeleton } from "./skeletons/listSkeleton";

interface Activity {
  id: string;
  message: string;
  type: string;
  createdAt: string;
  createdBy: {
    name: string | null;
  };
}

const iconMap = {
  JOB_CREATED: Briefcase,
  JOB_UPDATED: Pencil,
  APPLICATION_RECEIVED: UserPlus,
  INTERVIEW_SCHEDULED: CalendarDays,
  CANDIDATE_HIRED: CheckCircle,
};

export function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const res = await fetch("/api/dashboard/activities");
        const data = await res.json();
        setActivities(data.activities ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchActivities();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Latest actions in the recruitment system
        </CardDescription>
      </CardHeader>

      <CardContent>
        {loading ? (
          <ListSkeleton/>
        ) : activities.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No recent activity.
          </p>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => {
              const Icon =
                iconMap[activity.type as keyof typeof iconMap] ??
                Briefcase;

              return (
                <div
                  key={activity.id}
                  className="flex gap-3 border-b pb-3 last:border-none"
                >
                  <div className="rounded-full bg-muted p-2">
                    <Icon className="h-4 w-4" />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {activity.message}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {activity.createdBy?.name ?? "Unknown"} •{" "}
                      {new Date(activity.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}