import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { BriefcaseBusiness, Users, BarChart3 } from "lucide-react";
import { Button } from "@base-ui/react";

export default async function HomePage() {
  const session = await auth();

  // Already logged in
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <>
      <main className="relative min-h-screen bg-background">
        {/* Hero Section */}
        <div className="pointer-events-none absolute inset-0  overflow-hidden">
          <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-primary/15 blur-[120px]" />
          <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-blue-500/15 blur-[120px]" />
        </div>
        <section
          className="
          flex min-h-[80vh]
          flex-col items-center
          justify-center
          px-6 text-center
        "
        >
          <h1 className="font-bold tracking-tight leading-tight text-6xl md:text-7xl max-w-4xl ">
            Hire Smarter with
            <span className="text-primary"> HireTrack</span>
          </h1>

          <p
            className="
          mt-6 max-w-xl
          text-lg
          text-muted-foreground
          "
          >
            Streamline hiring from job posting to offer letters. Track
            candidates, collaborate with your team, and gain actionable hiring
            insights—all in one intuitive platform.
          </p>

          <div className="mt-8 flex gap-4">
            <Button className="rounded-xl px-7 py-3.5 font-medium shadow-lg transition hover:scale-105 ">

            <Link
              href="/login"
              className="
              rounded-lg
              bg-primary
              px-6 py-3
              text-primary-foreground
              "
              >
              Get Started
            </Link>
              </Button>
            <Button className="rounded-xl px-7 py-3.5 font-medium shadow-lg transition hover:scale-105 ">

            <Link
              href="#features"
              className="
              rounded-lg
              border
              px-6 py-3
              "
              >
              Learn More
            </Link>
              </Button>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="
        mx-auto max-w-5xl
        px-6 pb-20
        "
        >
          <div
            className="
          grid gap-6
          md:grid-cols-3
          "
          >
            <FeatureCard
              icon={BriefcaseBusiness}
              title="Manage Jobs"
              description="Create and track job openings easily."
            />

            <FeatureCard
              icon={Users}
              title="Track Candidates"
              description="Manage applications through every stage."
            />

            <FeatureCard
              icon={BarChart3}
              title="Hiring Analytics"
              description="Understand your recruitment pipeline."
            />
          </div>
        </section>
      </main>
    </>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div
      className="
        rounded-xl
        border
        p-6
      "
    >
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
        <Icon className="h-8 w-8 text-primary" />
      </div>

      <h3 className="mt-4 font-semibold">{title}</h3>

      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
