import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET() {
  const session = await auth();

  const where: Prisma.CandidateWhereInput = {};
  if(session?.user.role==="RECRUITER"){
      where.applications={
        some: {
          job: {
            createdById:session.user.id,
          },
        },
     }
  }

    const candidates = await prisma.candidate.findMany({
      where: {
        ...where,
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 4,

      include: {
        applications: {
          where: {
            job: {
              createdById: session!.user!.id,
            },
          },

          select: {
            status: true,
            job: {
              select: {
                title: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(candidates);
  }

