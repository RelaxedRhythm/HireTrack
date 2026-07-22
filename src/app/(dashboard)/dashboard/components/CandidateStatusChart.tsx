"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ChartSkeleton } from "./skeletons/chartSkeleton";

interface StatusData {
  status: string;
  count: number;
}

const COLORS = [
  "#64748b", // APPLIED
  "#f59e0b", // SCREENING
  "#8b5cf6", // INTERVIEW
  "#3b82f6", // OFFER
  "#10b981", // HIRED
  "#ef4444", // REJECTED
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border/40 bg-background/95 px-3 py-1.5 shadow-sm text-xs font-medium">
        <p className="text-muted-foreground">{payload[0].name}</p>
        <p className="text-foreground mt-0.5 font-bold">{payload[0].value} Candidates</p>
      </div>
    );
  }
  return null;
};

export function CandidateStatusChart() {
  const [data, setData] = useState<StatusData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/dashboard/candidate-status");
        const result = await res.json();
        setData([
          { status: "APPLIED", count: result.applied },
          { status: "SCREENING", count: result.screening },
          { status: "INTERVIEW", count: result.interview },
          { status: "OFFER", count: result.offer },
          { status: "HIRED", count: result.hired },
          { status: "REJECTED", count: result.rejected },
        ]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <Card className="border-border/40 bg-background/60">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold tracking-tight">Candidate Status</CardTitle>
        <CardDescription className="text-xs">
          Distribution of applications by status
        </CardDescription>
      </CardHeader>

      <CardContent className="h-[300px]">
        {loading ? (
           <ChartSkeleton/>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="40%"
                innerRadius={65}
                outerRadius={90}
                paddingAngle={3}
                label={({ status, percent }) =>
                  percent > 0.05 ? `${status.charAt(0) + status.slice(1).toLowerCase()} ${(percent! * 100).toFixed(0)}%` : ""
                }
                labelLine={false}
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} stroke="var(--background)" strokeWidth={2} />
                ))}
              </Pie>

              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle" 
                iconSize={8}
                formatter={(value) => <span className="text-xs text-muted-foreground font-medium">{value.charAt(0) + value.slice(1).toLowerCase()}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
