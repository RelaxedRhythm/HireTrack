import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";


export async function GET() {

  try {

    const session = await auth();


    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }


    const userId = session.user.id;


    const [
      totalJobs,
      activeJobs,
      candidates,
      interviews,
      hires
    ] = await Promise.all([


      // Total jobs created by recruiter
      prisma.job.count({
        where:{
          createdById:userId
        }
      }),


      // Open jobs
      prisma.job.count({
        where:{
          createdById:userId,
          status:"OPEN"
        }
      }),


      // Candidates who applied to recruiter jobs
      prisma.candidate.count({
        where:{
          applications:{
            some:{
              job:{
                createdById:userId
              }
            }
          }
        }
      }),


      // Interview stage candidates
      prisma.application.count({
        where:{
          job:{
            createdById:userId
          },
          status:"INTERVIEW"
        }
      }),


      // Hired candidates
      prisma.application.count({
        where:{
          job:{
            createdById:userId
          },
          status:"HIRED"
        }
      })


    ]);



    return NextResponse.json({
      totalJobs,
      activeJobs,
      candidates,
      interviews,
      hires
    });


  } catch(error){

    console.error(error);

    return NextResponse.json(
      {
        error:"Internal Server Error"
      },
      {
        status:500
      }
    );

  }

}