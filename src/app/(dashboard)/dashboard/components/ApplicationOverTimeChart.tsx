"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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

interface ChartData {
  month: string;
  applications: number;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border/40 bg-background/95 px-3 py-1.5 shadow-sm text-xs font-medium">
        <p className="text-muted-foreground">{payload[0].payload.month}</p>
        <p className="text-foreground mt-0.5 font-bold">{payload[0].value} Applications</p>
      </div>
    );
  }
  return null;
};

export function ApplicationOverTimeChart() {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChartData() {
      try {
        const res = await fetch("/api/dashboard/application-over-time");
        const result = await res.json();
        setData(
          result.map((item: any) => ({
            month: new Date(item.date).toLocaleString("default", {
              month: "short",
            }),
            applications: item.count,
          })),
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchChartData();
  }, []);

  return (
    <Card className="border-border/40 bg-background/60">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold tracking-tight">Applications Over Time</CardTitle>
        <CardDescription className="text-xs">Monthly application trend</CardDescription>
      </CardHeader>

      <CardContent className="h-[300px]">
        {loading ? (
          <ChartSkeleton/>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} opacity={0.4} />

              <XAxis 
                dataKey="month" 
                tickLine={false} 
                axisLine={false} 
                fontSize={11} 
                tickMargin={8} 
                stroke="var(--color-muted-foreground, #64748b)" 
              />

              <YAxis 
                allowDecimals={false} 
                tickLine={false} 
                axisLine={false} 
                fontSize={11} 
                tickMargin={8} 
                stroke="var(--color-muted-foreground, #64748b)" 
              />

              <Tooltip content={<CustomTooltip />} />

              <Line
                type="monotone"
                dataKey="applications"
                stroke="#6366f1"
                strokeWidth={2}
                dot={{ r: 3, fill: "#6366f1", strokeWidth: 0 }}
                activeDot={{ r: 5, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
