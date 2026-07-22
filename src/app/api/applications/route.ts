// app/api/applications/route.ts

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import  prisma  from "@/lib/prisma";
import { ApplicationStatus, Role } from "@/lib/constants/application";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") ?? "1");
    const limit = Number(searchParams.get("limit") ?? "10");

    const search = searchParams.get("search") ?? "";
    const status = searchParams.get("status") ?? "";
    const jobId = searchParams.get("jobId") ?? "";

    const skip = (page - 1) * limit;

    const where = {
      ...(status && { status: status as ApplicationStatus }),

      ...(jobId && { jobId }),

      ...(search && {
        candidate: {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              email: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
          ],
        },
      }),

      ...(session.user.role !== Role.ADMIN && {
        job: {
          createdById: session.user.id,
        },
      }),
    };

    const [applications, total] = await Promise.all([
      prisma.application.findMany({
        where:{...where},
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          candidate: true,
          job: {
            select: {
              id: true,
              title: true,
              company: true,
              status: true,
            },
          },
        },
      }),

      prisma.application.count({
        where,
      }),
    ]);

    return NextResponse.json({
      applications,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch applications",
      },
      {
        status: 500,
      }
    );
  }
}