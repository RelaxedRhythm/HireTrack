"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  Tooltip,
  LabelList,
  Cell,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartSkeleton } from "./skeletons/chartSkeleton";

interface FunnelData {
  stage: string;
  count: number;
}

const FUNNEL_COLORS = [
  "var(--color-slate-800, #1e293b)",
  "var(--color-slate-700, #334155)",
  "var(--color-slate-600, #475569)",
  "var(--color-slate-500, #64748b)",
  "var(--color-slate-400, #94a3b8)",
];

interface FunnelTooltipPayload {
  value: number;
  payload: {
    stage: string;
    count: number;
  };
}

interface FunnelTooltipProps {
  active?: boolean;
  payload?: FunnelTooltipPayload[];
}

const CustomTooltip = ({ active, payload }: FunnelTooltipProps) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-border/40 bg-background/95 px-3 py-1.5 shadow-sm text-xs font-medium">
      <p className="text-muted-foreground">{payload[0].payload.stage}</p>
      <p className="text-foreground mt-0.5 font-bold">
        {payload[0].value} Candidates
      </p>
    </div>
  );
};
export function HiringFunnelChart() {
  const [data, setData] = useState<FunnelData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/dashboard/funnel");
        const result = await res.json();
        setData(
          result.map((item: FunnelData) => ({
            stage: item.stage,
            count: item.count,
          })),
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Card className="border-border/40 bg-background/60">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold tracking-tight">
          Hiring Funnel
        </CardTitle>
        <CardDescription className="text-xs">
          Candidate progression through hiring stages
        </CardDescription>
      </CardHeader>

      <CardContent className="h-75">
        {loading ? (
          <ChartSkeleton/>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <FunnelChart>
              <Tooltip content={<CustomTooltip />} />

              <Funnel dataKey="count" data={data} isAnimationActive>
                <LabelList
                  position="right"
                  dataKey="stage"
                  fill="var(--color-muted-foreground, #64748b)"
                  stroke="none"
                  fontSize={11}
                  fontWeight={500}
                />
                {data.map((_, index) => (
                  <Cell
                    key={index}
                    fill={FUNNEL_COLORS[index % FUNNEL_COLORS.length]}
                    opacity={0.9}
                  />
                ))}
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
