import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { JobSchema } from "@/lib/validations/jobs";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET /api/jobs/[id]
export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    console.log({
      id,
      sessionUser: session.user.id,
    });

    const job = await prisma.job.findFirst({
      where: {
        id,
        // createdById: session.user.id,
      },
      // include: {
      //   applications: {
      //     include: {
      //       candidate: true,
      //     },
      //   },
      // },
    });

    console.log(job);

    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// PATCH /api/jobs/[id]
export async function PATCH(req: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const existingJob = await prisma.job.findFirst({
      where: {
        id,
        createdById: session.user.id,
      },
    });

    if (!existingJob) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    const body = await req.json();

    const validation = JobSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          errors: validation.error.flatten().fieldErrors,
        },
        {
          status: 400,
        },
      );
    }

    const updatedJob = await prisma.job.update({
      where: {
        id,
      },
      data: validation.data,
    });

    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// DELETE /api/jobs/[id]
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const existingJob = await prisma.job.findFirst({
      where: {
        id,
        createdById: session.user.id,
      },
    });

    if (!existingJob) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    await prisma.job.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
