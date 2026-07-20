import { Role, JobStatus, JobType, ApplicationStatus } from "@prisma/client";

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


const hashedAdminPassword=await bcrypt.hash("admin123",12);
      const user = await prisma.user.create({
          data:{
              name:"admin",
              email:"admin@example.com",
              password:hashedAdminPassword,
              role:Role.ADMIN
          }
      })
      console.log("admin created",user);

  // Create recruiter
  const hashedPassword = await bcrypt.hash("recruiter123", 10);

  const recruiter = await prisma.user.create({
    data: {
      email: "recruiter@example.com",
      password: hashedPassword,
      name: "John Recruiter",
      role: Role.RECRUITER,
    },
  });

  console.log("✅ User created");

  // Candidates
  const candidates = [];

  for (let i = 1; i <= 20; i++) {
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

  const jobs = [];

  for (let i = 1; i <= 10; i++) {
    const job = await prisma.job.create({
      data: {
        title: `Software Engineer ${i}`,
        company: `Company ${i}`,
        location: ["Delhi", "Bangalore", "Remote", "Mumbai"][i % 4],
        type: jobTypes[i % jobTypes.length],
        status: jobStatuses[i % jobStatuses.length],
        salary: `${6 + i}-${8 + i} LPA`,
        description: `This is the description for job ${i}.`,
        createdById: recruiter.id,
      },
    });

    jobs.push(job);
  }

  console.log("✅ Jobs created");

  // Applications
  const appStatuses = Object.values(ApplicationStatus);

  const usedPairs = new Set();

  let created = 0;

  while (created < 40) {
    const candidate = candidates[Math.floor(Math.random() * candidates.length)];
    const job = jobs[Math.floor(Math.random() * jobs.length)];

    const key = `${candidate.id}-${job.id}`;

    if (usedPairs.has(key)) continue;

    usedPairs.add(key);

    await prisma.application.create({
      data: {
        candidateId: candidate.id,
        jobId: job.id,
        status: appStatuses[Math.floor(Math.random() * appStatuses.length)],
        rating: Math.floor(Math.random() * 5) + 1,
        notes: "Strong candidate.",
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