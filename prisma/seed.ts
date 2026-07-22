import { Role, JobStatus, JobType, ApplicationStatus,ActivityType } from "@prisma/client";

import prisma from "../src/lib/prisma"
import bcrypt from "bcryptjs";

// const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clean existing data
  await prisma.application.deleteMany();
  await prisma.candidate.deleteMany();
  await prisma.job.deleteMany();
  await prisma.user.deleteMany();


const AdminPassword=await bcrypt.hash("admin123",12);
const RecruiterPassword = await bcrypt.hash("recruiter123", 10);
      const admin = await prisma.user.create({
          data:{
              name:"admin",
              email:"admin@example.com",
              password:AdminPassword,
              role:Role.ADMIN
          }
      })

  // Create recruiter
  const recruiter1 = await prisma.user.create({
     data: {
    name: "John Recruiter",
    email: "john@example.com",
    password: RecruiterPassword,
    role: Role.RECRUITER,
  },
  });
  const recruiter2 = await prisma.user.create({
  data: {
    name: "Sarah Recruiter",
    email: "sarah@example.com",
    password: RecruiterPassword,
    role: Role.RECRUITER,
  },
});

const users = [admin, recruiter1, recruiter2];


  console.log("✅ User created");

  // Candidates
  const candidates = [];

  for (let i = 1; i <= 30; i++) {
    const candidate = await prisma.candidate.create({
      data: {
        name: `Candidate ${i}`,
        email: `candidate${i}@example.com`,
        phone: `9876543${String(i).padStart(3, "0")}`,
        resumeUrl: `https://example.com/resume${i}.pdf`,
        linkedinUrl: `https://linkedin.com/in/candidate${i}`,
      },
    });

    candidates.push(candidate);
  }

  console.log("✅ Candidates created");

  // Jobs
  const jobTypes = Object.values(JobType);
  const jobStatuses = [JobStatus.OPEN, JobStatus.CLOSED, JobStatus.DRAFT];

  const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Adobe",
  "Flipkart",
  "Swiggy",
  "Zomato",
  "Razorpay",
  "PhonePe",
  "Atlassian",
];

const titles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Software Engineer",
  "DevOps Engineer",
  "Data Engineer",
  "QA Engineer",
  "UI UX Designer",
  "Mobile Developer",
  "Product Engineer",
];

const locations = [
  "Remote",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Mumbai",
];

  const jobs = [];

  for (let i = 1; i <= 10; i++) {
     const owner = users[Math.floor(Math.random() * users.length)];

    const job = await prisma.job.create({
      data: {
        title: titles[i%titles.length],
        company: companies[i % companies.length],
        location: locations[i % locations.length],
        type: jobTypes[i % jobTypes.length],
        status: jobStatuses[i % jobStatuses.length],
        salary: `${6 + i}-${8 + i} LPA`,
        description: `This is the description for job ${i}.`,
        createdById: owner.id,
      },
    });

    jobs.push(job);
    
    await prisma.activity.create({
      data: {
        createdById: owner.id,
        type: ActivityType.JOB_CREATED,
        message: `Created job "${job.title}"`,
      },
    });
  }
  console.log("✅ Jobs created");

  // Applications
  const appStatuses = Object.values(ApplicationStatus);

  const usedPairs = new Set();

  let created = 0;

  while (created < 60) {
    const candidate = candidates[Math.floor(Math.random() * candidates.length)];
    const job = jobs[Math.floor(Math.random() * jobs.length)];
    const status=appStatuses[Math.floor(Math.random() * appStatuses.length)]
    const key = `${candidate.id}-${job.id}`;

    if (usedPairs.has(key)) continue;

    usedPairs.add(key);

    await prisma.application.create({
      data: {
        candidateId: candidate.id,
        jobId: job.id,
        status: status,
        rating: Math.floor(Math.random() * 5) + 1,
        notes: "Strong candidate.",
      },
    });

   await prisma.activity.create({
  data: {
    createdById: job.createdById,
    type: ActivityType.APPLICATION_RECEIVED,
    message: `${candidate.name} applied for "${job.title}"`,
  },
});
    created++;
  }

  console.log("✅ Applications created");
  console.log("🎉 Database seeded successfully!");

  

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });