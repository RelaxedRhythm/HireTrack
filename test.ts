// import "dotenv/config";
// import prisma from "./src/lib/prisma";

// async function main() {
//   console.time("findUser");

//   const user = await prisma.user.findFirst();

//   console.timeEnd("findUser");

//   console.log(user);

//   await prisma.$disconnect();
// }

// main().catch(console.error);

import prisma from "./src/lib/prisma";

async function main() {
  console.time("prisma");

  const applications = await prisma.application.findMany();

  console.timeEnd("prisma");

  console.log(applications);

  await prisma.$disconnect();
}

main().catch(console.error);