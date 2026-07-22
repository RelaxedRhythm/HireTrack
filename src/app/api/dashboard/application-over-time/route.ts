import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id)
    return NextResponse.json(
      {},
      {
        status: 401,
      },
    );

  const where: Prisma.ApplicationWhereInput = {};

  if (session?.user.role === "RECRUITER") {
    where.job = {
      createdById: session.user.id,
    };
  }

  const applications = await prisma.application.findMany({
    where:{...where},

    select: {
      createdAt: true,
    },
  });

  const grouped: Record<string, number> = {};

  applications.forEach((app) => {
    const date = app.createdAt.toISOString().split("T")[0];

    grouped[date] = (grouped[date] || 0) + 1;
  });

  return NextResponse.json(
    Object.entries(grouped).map(([date, count]) => ({
      date,
      count,
    })),
  );
}
