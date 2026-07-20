import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import  prisma  from "@/lib/prisma";
// import { CandidateSchema } from "@/lib/validations/candidates";

// GET /api/candidates
export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") ?? 1);

    const limit = Number(searchParams.get("limit") ?? 10);

    const search = searchParams.get("search") ?? "";

    const sort = searchParams.get("sort") ?? "createdAt";

    const order = searchParams.get("order") === "asc" ? "asc" : "desc";

    const skip = (page - 1) * limit;

    const where: Prisma.CandidateWhereInput = {
      applications: {
        some: {
          job: {
            createdById: session.user.id,
          },
        },
      },
    };

    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    const allowedSortFields = ["createdAt", "updatedAt", "name", "email"];

    const sortField = allowedSortFields.includes(sort) ? sort : "createdAt";

    const [candidates, total] = await Promise.all([
      prisma.candidate.findMany({
        where,

        include: {
          _count: {
            select: {
              applications: true,
            },
          },
        },

        skip,

        take: limit,

        orderBy: {
          [sortField]: order,
        },
      }),

      prisma.candidate.count({
        where,
      }),
    ]);

    return NextResponse.json({
      candidates,

      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
