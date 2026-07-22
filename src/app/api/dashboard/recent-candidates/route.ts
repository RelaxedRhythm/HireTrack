import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await auth();

  const candidates = await prisma.candidate.findMany({
    where: {
      applications: {
        some: {
          job: {
            createdById: session!.user!.id,
          },
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },

    take: 5,

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

  // console.log(candidates[0].applications);
  return NextResponse.json(candidates);
}
