import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id)
    return NextResponse.json(
      {},
      {
        status: 401,
      },
    );

    const where: Prisma.ApplicationWhereInput={};

    if(session.user.role==="RECRUITER"){
        where.job={
            createdById: session.user.id,
        }
    }

  const result = await prisma.application.groupBy({
    by: ["status"],

    _count: {
      status: true,
    },

    where,
  });

  return NextResponse.json(
    result.map((item) => ({
      status: item.status,

      count: item._count.status,
    })),
  );
}
