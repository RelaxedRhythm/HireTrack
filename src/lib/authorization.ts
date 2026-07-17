import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function requireAdmin() {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    if (session.user.role !== "ADMIN") {
        redirect("/dashboard");
    }

    return session.user;
}