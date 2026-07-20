import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import  prisma  from "@/lib/prisma";
import { CreateApplicationSchema } from "../../../../../lib/validations/applications";

interface RouteParams {
  params: Promise<{
    jobId: string;
  }>;
}

export async function POST(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { jobId } = await params;

    const job = await prisma.job.findFirst({
      where: {
        id: jobId,
        createdById: session.user.id,
      },
    });

    if (!job) {
      return NextResponse.json(
        { message: "Job not found" },
        { status: 404 }
      );
    }

    const body = await req.json();

    const validation =
      CreateApplicationSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          errors:
            validation.error.flatten().fieldErrors,
        },
        {
          status: 400,
        }
      );
    }

    const {
      name,
      email,
      phone,
      resumeUrl,
    } = validation.data;

    let candidate =
      await prisma.candidate.findUnique({
        where: {
          email,
        },
      });

    if (!candidate) {
      candidate =
        await prisma.candidate.create({
          data: {
            name,
            email,
            phone,
            resumeUrl,
          },
        });
    }

    const existing =
      await prisma.application.findUnique({
        where: {
          candidateId_jobId: {
            candidateId: candidate.id,
            jobId,
          },
        },
      });

    if (existing) {
      return NextResponse.json(
        {
          message:
            "Candidate has already applied for this job",
        },
        {
          status: 409,
        }
      );
    }

    const application =
      await prisma.application.create({
        data: {
          candidateId: candidate.id,
          jobId,
        },

        include: {
          candidate: true,
          job: true,
        },
      });

    return NextResponse.json(application, {
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
      }
    );
  }
}


export async function GET(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { jobId } = await params;

    const job = await prisma.job.findFirst({
      where: {
        id: jobId,
        createdById: session.user.id,
      },
    });

    if (!job) {
      return NextResponse.json(
        {
          message: "Job not found",
        },
        {
          status: 404,
        }
      );
    }

    const applications =
      await prisma.application.findMany({
        where: {
          jobId,
        },

        include: {
          candidate: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json(applications);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}