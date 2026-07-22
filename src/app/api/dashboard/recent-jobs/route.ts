import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await auth();

  const where: Prisma.JobWhereInput = {};
  
      if(session?.user.role==="RECRUITER"){
      where.createdById=session.user.id;
      }

  const jobs = await prisma.job.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },

    take: 5,

    include: {
      _count: {
        select: {
          applications: true,
        },
      },
    },
  });

  return NextResponse.json(jobs);
}
