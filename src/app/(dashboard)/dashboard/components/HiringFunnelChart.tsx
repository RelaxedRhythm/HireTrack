"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  Tooltip,
  LabelList,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FunnelData {
  stage: string;
  count: number;
}

export function HiringFunnelChart() {
  const [data, setData] = useState<FunnelData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/dashboard/funnel");
        const result = await res.json();
        // setData(result);
        setData([
          { stage: "Applied", count: result.applied },
          { stage: "Screening", count: result.screening },
          { stage: "Interview", count: result.interview },
          { stage: "Offer", count: result.offer },
          { stage: "Hired", count: result.hired },
        ]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hiring Funnel</CardTitle>
        <CardDescription>
          Candidate progression through hiring stages
        </CardDescription>
      </CardHeader>

      <CardContent className="h-[350px]">
        {loading ? (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Loading...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <FunnelChart>
              <Tooltip />

              <Funnel dataKey="count" data={data} isAnimationActive>
                <LabelList
                  position="right"
                  dataKey="stage"
                  fill="#374151"
                  stroke="none"
                />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
