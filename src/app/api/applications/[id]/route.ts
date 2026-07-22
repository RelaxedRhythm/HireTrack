import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { UpdateApplicationSchema } from "@/lib/validations/applications";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const where: Prisma.ApplicationWhereInput = {};

    if (session.user.role === "RECRUITER") {
      where.job = {
        createdById: session.user.id,
      };
    }

    const { id } = await params;

    const application = await prisma.application.findFirst({
      where: {
        ...where,
        id,
      },

      include: {
        candidate: true,
        job: true,
      },
    });

    if (!application) {
      return NextResponse.json(
        {
          message: "Application not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(application);
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

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const where: Prisma.ApplicationWhereInput = {};

    if (session.user.role === "RECRUITER") {
      where.job = {
        createdById: session.user.id,
      };
    }

    const application = await prisma.application.findFirst({
      where: {
        id,
      },
    });

    if (!application) {
      return NextResponse.json(
        {
          message: "Application not found",
        },
        {
          status: 404,
        },
      );
    }

    const body = await req.json();

    const validation = UpdateApplicationSchema.safeParse(body);

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

    const updated = await prisma.application.update({
      where: {
        id,
      },

      data: validation.data,

      include: {
        candidate: true,
        job: true,
      },
    });

    return NextResponse.json(updated);
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

export async function DELETE(req: NextRequest, { params }: RouteParams) {
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

    const { id } = await params;

    const where: Prisma.ApplicationWhereInput = {};

    if (session.user.role === "RECRUITER") {
      where.job = {
        createdById: session.user.id,
      };
    }

    const application = await prisma.application.findFirst({
      where: {
        id,
      },
    });

    if (!application) {
      return NextResponse.json(
        {
          message: "Application not found",
        },
        {
          status: 404,
        },
      );
    }

    const deletedApplication = await prisma.$transaction(async (tx) => {
      const application = await tx.application.delete({
        where: {
          id,
        },
      });

      const remaining = await tx.application.count({
        where: {
          candidateId: application.candidateId,
        },
      });

      if (remaining === 0) {
        await tx.candidate.delete({
          where: {
            id: application.candidateId,
          },
        });
      }

      return application;
    });

    return NextResponse.json({
      message: "Application deleted successfully",
      application: deletedApplication,
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
