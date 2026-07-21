import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function getStats() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const jobWhere: Prisma.JobWhereInput = {};

    if (session.user.role === "RECRUITER") {
      jobWhere.createdById = userId;
    }

    const applicationWhere: Prisma.ApplicationWhereInput = {};

    if (session.user.role === "RECRUITER") {
      applicationWhere.job = {
        createdById: userId,
      };
    }

    const candidateWhere: Prisma.CandidateWhereInput = {};

    if (session.user.role === "RECRUITER") {
      candidateWhere.applications = {
        some: {
          job: {
            createdById: userId,
          },
        },
      };
    }

    const [totalJobs, activeJobs, candidates, interviews, hires] =
      await Promise.all([
        // Total jobs created by recruiter
        prisma.job.count({
          where: jobWhere,
        }),

        // Open jobs
        prisma.job.count({
          where: {
            ...jobWhere,
            status: "OPEN",
          },
        }),

        // Candidates who applied to recruiter jobs
        prisma.candidate.count({
          where: candidateWhere,
        }),

        // Interview stage candidates
        prisma.application.count({
          where: {
            ...applicationWhere,
            status: "INTERVIEW",
          },
        }),

        // Hired candidates
        prisma.application.count({
          where: {
            ...applicationWhere,
            status: "HIRED",
          },
        }),
      ]);

    return NextResponse.json({
      totalJobs,
      activeJobs,
      candidates,
      interviews,
      hires,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
