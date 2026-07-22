import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { Prisma } from "@prisma/client";

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
    const where: Prisma.ActivityWhereInput = {};
    
      if (session?.user.role === "RECRUITER") {
        where.createdById= session.user.id
      };


    const activities = await prisma.activity.findMany({

      where: {
        ...where,
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