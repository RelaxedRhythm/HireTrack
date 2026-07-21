import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";


export async function GET(req: NextRequest) {

  try {

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }


    const activities = await prisma.activity.findMany({

      where: {
        createdById: session.user.id
      },

      orderBy: {
        createdAt: "desc"
      },

      take: 10,

      include: {
        createdBy: {
          select:{
            id:true,
            name:true,
            email:true
          }
        }
      }

    });


    return NextResponse.json({
      activities
    });


  } catch(error){

    console.error(error);

    return NextResponse.json(
      {
        error:"Failed to fetch activities"
      },
      {
        status:500
      }
    );

  }

}