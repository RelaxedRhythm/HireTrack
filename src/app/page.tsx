
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  BriefcaseBusiness,
  Users,
  BarChart3,
} from "lucide-react";


export default async function HomePage() {

  const session = await auth();


  // Already logged in
  if (session?.user) {
    redirect("/dashboard");
  }


  return (
    <main className="min-h-screen">

      {/* Hero Section */}
      <section
        className="
          flex min-h-[80vh]
          flex-col items-center
          justify-center
          px-6 text-center
        "
      >

        <h1
          className="
            max-w-3xl
            text-5xl
            font-bold
            tracking-tight
          "
        >
          Hire smarter with
          <span className="text-primary">
            {" "}HireTrack
          </span>
        </h1>


        <p
          className="
            mt-6 max-w-xl
            text-lg
            text-muted-foreground
          "
        >
          A modern Applicant Tracking System
          that helps recruiters manage jobs,
          candidates, and hiring workflows.
        </p>


        <div className="mt-8 flex gap-4">

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

      <Icon className="h-8 w-8 text-primary"/>

      <h3 className="mt-4 font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-sm text-muted-foreground">
        {description}
      </p>

    </div>
  );
}