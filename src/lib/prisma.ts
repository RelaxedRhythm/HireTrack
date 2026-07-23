import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";


const globalForPrisma = globalThis  as {
  prisma?: PrismaClient 
  adapter?: PrismaNeon;
};

const connectionString = process.env.DATABASE_URL!;

const adapter =
  globalForPrisma.adapter ??
  new PrismaNeon({ connectionString,});


 const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.adapter = adapter;
}

export default prisma;

// import "dotenv/config";
// import { PrismaClient } from "@prisma/client";
// import { PrismaPg } from "@prisma/adapter-pg";
// import { Pool } from "pg";

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   max: 5,
// });

// const adapter = new PrismaPg(pool);

// export const prisma = new PrismaClient({
//   adapter,
// });

// import { PrismaClient } from "../../app/generated/prisma/client"; 
// import { PrismaPg } from "@prisma/adapter-pg"; 
// const globalForPrisma = global as unknown as {
//   prisma: PrismaClient; 
// }; 
// const adapter = new PrismaPg({
//   connectionString: process.env.DATABASE_URL, 
// }); 
// const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     adapter, 
//   }); 
// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma; 
// export default prisma; 