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
  "#3b82f6",
  "#f59e0b",
  "#8b5cf6",
  "#10b981",
  "#22c55e",
  "#ef4444",
];

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
        // setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Candidate Status</CardTitle>
        <CardDescription>
          Distribution of applications by status
        </CardDescription>
      </CardHeader>

      <CardContent className="h-[350px]">
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
                cy="50%"
                outerRadius={110}
                label={({ status, percent }) =>
                  `${status} ${(percent! * 100).toFixed(0)}%`
                }
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
