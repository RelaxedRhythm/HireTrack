 "use client"
import Link from "next/link";
import {
  BriefcaseBusiness,
  Users,
  FileText,
  ArrowRight,
} from "lucide-react";

const cards = [
  {
    title: "Create Job",
    description: "Post a new job opening and start hiring.",
    icon: BriefcaseBusiness,
    href: "/jobs/create",
  },
  {
    title: "Manage Candidates",
    description: "Review and track candidate applications.",
    icon: Users,
    href: "/candidates",
  },
  {
    title: "Applications",
    description: "View application pipeline and statuses.",
    icon: FileText,
    href: "/applications",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <h1 className="text-3xl font-semibold tracking-tight">
          Welcome back 👋
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage your hiring process, candidates, and job openings from here.
        </p>
      </section>


      {/* Quick Actions */}
      <section>
        <h2 className="text-xl font-semibold mb-4">
          Quick Actions
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.title}
                href={card.href}
                className="
                  group rounded-xl border bg-card p-5
                  transition hover:shadow-md
                "
              >
                <Icon className="h-8 w-8 mb-4 text-primary" />

                <h3 className="font-medium">
                  {card.title}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {card.description}
                </p>


                <div className="mt-4 flex items-center gap-2 text-sm text-primary">
                  Open
                  <ArrowRight
                    className="
                      h-4 w-4 transition
                      group-hover:translate-x-1
                    "
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </section>


      {/* Empty Activity Placeholder */}
      <section className="rounded-xl border p-6">
        <h2 className="font-semibold">
          Recent Activity
        </h2>

        <p className="mt-3 text-sm text-muted-foreground">
          Your latest hiring activities will appear here.
        </p>
      </section>
    </div>
  );
}