import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { ApplicationStatus } from "@prisma/client";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  const stages = [
    "APPLIED",
    "SCREENING",
    "INTERVIEW",
    "OFFER",
    "HIRED",
    "REJECTED",
  ];

  const where: Prisma.ApplicationWhereInput={};
  
      if(session.user.role==="RECRUITER"){
          where.job={
              createdById: session.user.id,
          }
      }

  const data = await Promise.all(
    stages.map(async (stage) => {
      const count = await prisma.application.count({
        where: {
          status: stage as ApplicationStatus,
        },
      });

      return {
        stage,
        count,
      };
    }),
  );

  return NextResponse.json(data);
}
