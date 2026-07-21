import {StatsCards} from "./components/StatsCards"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <StatsCards />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* <HiringFunnelChart /> */}
        {/* <CandidateStatusChart /> */}
      </div>

      {/* <ApplicationsOverTimeChart /> */}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* <RecentJobs /> */}
        {/* <RecentCandidates /> */}
        {/* <ActivityFeed /> */}
      </div>

      {/* <QuickActions /> */}
    </div>
  );
}