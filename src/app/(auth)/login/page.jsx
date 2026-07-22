import { LoginForm } from "@/app/components/auth/login-form";
import {auth} from "../../../auth"
import {redirect} from "next/navigation";

export default async function LoginPage() {
    const session=await auth();
    if(session) redirect("/");
  return (
    <main className="flex min-h-screen items-center justify-center">
      <LoginForm />
    </main>
  );
}