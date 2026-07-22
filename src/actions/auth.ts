"use server";
import "dotenv/config"
import  prisma  from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signupSchema } from "@/lib/validations/users";
import { redirect } from "next/navigation";

export async function signup(formData: FormData) {
  const result = signupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!result.success) {
    return {
      error: result.error.flatten().fieldErrors,
    };
  }

  const data =result.data;

  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    return {
      error: "Email already exists",
    };
  }

  const hashedPassword = await bcrypt.hash(data.password, 12);

  await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  });

  redirect("/login");
}

import { signIn, signOut } from "../auth";

// export async function login(formData: FormData) {
//   try {
//     await signIn("credentials", {
//       email: formData.get("email"),
//       password: formData.get("password"),
//       redirectTo: "/dashboard",
//     });
//   } catch (error){
//     (error);
//     return {
//       error: "Invalid email or password",
//     };
//   }
// }

export async function login(formData: FormData) {
  await signIn("credentials", {
    email: formData.get("email"),
    password: formData.get("password"),
    redirectTo: "/dashboard",
  });
}

export async function logout() {
  await signOut({
    redirectTo: "/login",
  });
}