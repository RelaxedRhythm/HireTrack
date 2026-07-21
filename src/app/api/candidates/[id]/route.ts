import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { auth } from "@/auth";
import  prisma  from "@/lib/prisma";
import { CandidateSchema } from "@/lib/validations/candidates";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET
export async function GET(req: NextRequest, { params }: RouteParams) {
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

    const where:Prisma.CandidateWhereInput={};

    if(session.user.role==="RECRUITER"){
      where.applications={
        some: {
          job: {
            createdById: session.user.id,
          },
        },
      }
    }

    const { id } = await params;

    const candidate = await prisma.candidate.findFirst({
      where: {
        id,
      },

      include: {
        applications: {
          include: {
            job: true,
          },
        },
      },
    });

    if (!candidate) {
      return NextResponse.json(
        {
          message: "Candidate not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(candidate);
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

// PATCH
export async function PATCH(req: NextRequest, { params }: RouteParams) {
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

    const where:Prisma.CandidateWhereInput={};

    if(session.user.role==="RECRUITER"){
      where.applications={
        some: {
          job: {
            createdById: session.user.id,
          },
        },
      }
    }

    const existingCandidate = await prisma.candidate.findFirst({
      where: {
        id,
      },
    });

    if (!existingCandidate) {
      return NextResponse.json(
        {
          message: "Candidate not found",
        },
        {
          status: 404,
        },
      );
    }

    const body = await req.json();

    const validation = CandidateSchema.safeParse(body);

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

    const updatedCandidate = await prisma.candidate.update({
      where: {
        id,
      },

      data: validation.data,

      include: {
        applications: {
          include: {
            job: true,
          },
        },
      },
    });

    return NextResponse.json(updatedCandidate);
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

// DELETE
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

    const where:Prisma.CandidateWhereInput={};

    if(session.user.role==="RECRUITER"){
      where.applications={
        some: {
          job: {
            createdById: session.user.id,
          },
        },
      }
    }

    const { id } = await params;

    const existingCandidate = await prisma.candidate.findFirst({
      where: {
        id,
      },
    });

    if (!existingCandidate) {
      return NextResponse.json(
        {
          message: "Candidate not found",
        },
        {
          status: 404,
        },
      );
    }

    await prisma.candidate.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Candidate deleted successfully",
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
