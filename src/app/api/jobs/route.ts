import { Prisma, JobStatus, JobType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import  prisma  from "@/lib/prisma";
import { JobSchema } from "@/lib/validations/jobs";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const validation = JobSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const job = await prisma.job.create({
      data: {
        ...validation.data,
        createdById: session.user.id,
      },
    });

    return NextResponse.json(job, {
      status: 201,
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

    const status = searchParams.get("status");

    const type = searchParams.get("type");

    const sort = searchParams.get("sort") ?? "createdAt";

    const order = searchParams.get("order") === "asc" ? "asc" : "desc";

    const skip = (page - 1) * limit;

    const where: Prisma.JobWhereInput = {};

    if(session.user.role==="RECRUITER"){
    where.createdById=session.user.id;
  }

    if (search) {
      where.OR = [
        {
          title: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
        {
          company: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
      ];
    }

    if (
      status &&
      status !== "all" &&
      Object.values(JobStatus).includes(status as JobStatus)
    ) {
      where.status = status as JobStatus;
    }

    if (
      type &&
      type !== "all" &&
      Object.values(JobType).includes(type as JobType)
    ) {
      where.type = type as JobType;
    }

    const allowedSortFields = [
      "createdAt",
      "updatedAt",
      "company",
      "title",
      "status",
    ];

    const sortField = allowedSortFields.includes(sort) ? sort : "createdAt";

    // const [jobs, total] = await Promise.all([
    //   prisma.job.findMany({
    //     where,
    //     // include: {
    //     //   applications: true,
    //     // },
    //     skip,
    //     take: limit,

    //     orderBy: {
    //       [sortField]: order,
    //     },
    //   }),
    //   prisma.job.count({
    //     where,
    //   }),
    // ]);

    const jobs = await prisma.job.findMany({
  where,include: {
    applications: true,
  },
});

     console.log("after queries");
    return NextResponse.json({
      jobs,

      // pagination: {
      //   total,
      //   page,
      //   limit,
      //   totalPages: Math.ceil(total / limit),
      // },
    });
  } catch (error) {
    console.error("JOBS API ERROR:", JSON.stringify(error, null, 2));

    return NextResponse.json(
      {
        message: "Internal Server Error",
        error,
      },
      {
        status: 500,
      },
    );
  }
}
