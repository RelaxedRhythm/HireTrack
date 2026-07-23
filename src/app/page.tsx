import Link from "next/link";
import { BriefcaseBusiness, ChartNoAxesCombined, Users } from "lucide-react";

import { auth } from "@/auth";

const features = [
  {
    icon: BriefcaseBusiness,
    title: "Manage jobs",
    description: "Create and track openings in one place.",
  },
  {
    icon: Users,
    title: "Track candidates",
    description: "Keep every applicant and application organized.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "See progress",
    description: "Understand your hiring pipeline at a glance.",
  },
];

export default async function HomePage() {
  const session = await auth();
  const name = session?.user?.name?.split(" ")[0];

  if (session?.user) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center px-6">
        <section className="w-full rounded-3xl border bg-card p-8 shadow-sm md:p-12">
          <p className="text-sm font-medium text-primary">HireTrack</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            Welcome back{name ? `, ${name}` : ""}.
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            HireTrack keeps your jobs, candidates, and applications together so
            your team can focus on hiring.
          </p>
          <Link
            href="/dashboard"
            className="mt-8 inline-flex rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Open dashboard
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="relative overflow-hidden">
      <section className="mx-auto flex min-h-[72vh] max-w-5xl flex-col items-center justify-center px-6 text-center">
        <p className="text-sm font-semibold text-primary">HireTrack</p>
        <h1 className="mt-4 max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
          Hire smarter, from opening to offer.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          A simple workspace for managing jobs, candidates, applications, and
          hiring progress.
        </p>
        <Link
          href="/login"
          className="mt-8 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Get started
        </Link>
      </section>

      <section className="mx-auto grid max-w-5xl gap-5 px-6 pb-20 md:grid-cols-3">
        {features.map(({ icon: Icon, title, description }) => (
          <article key={title} className="rounded-2xl border bg-card p-6 text-left">
            <Icon className="h-7 w-7 text-primary" />
            <h2 className="mt-4 text-lg font-semibold">{title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
