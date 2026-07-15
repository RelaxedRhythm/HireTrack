"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function updateProfile(formData: FormData) {
  const session = await auth();

  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  const name = formData.get("name") as string;

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      name,
    },
  });

  return {
    success: true,
  };
}

import bcrypt from "bcryptjs";

export async function changePassword(formData: FormData) {
  const session = await auth();

  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    return {
      error: "User not found",
    };
  }

  const valid = await bcrypt.compare(currentPassword, user.password);

  if (!valid) {
    return {
      error: "Current password is incorrect",
    };
  }

  const hashed = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      password: hashed,
    },
  });

  return {
    success: true,
  };
}