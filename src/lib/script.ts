import "dotenv/config";
import {prisma} from "./prisma"
import bcrypt from "bcryptjs"
async function main(){
  

    const hashedPassword=await bcrypt.hash("admin123",12);
    const user = await prisma.user.create({
        data:{
            name:"admin",
            email:"admin@example.com",
            password:hashedPassword,
            role:"ADMIN"
        }
    })
    console.log("admin created",user);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });