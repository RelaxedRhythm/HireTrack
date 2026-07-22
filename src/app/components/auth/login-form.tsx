"use client";

import { useState } from "react";
import { login } from "@/actions/auth";
import Link from "next/link";
export function LoginForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);

    await login(formData);

    setLoading(false);
  }

  return (
    <form
      action={handleSubmit}
      className="w-full max-w-md space-y-6 rounded-2xl border border-border bg-card p-8 shadow-sm"
    >
       <div className="space-y-2 text-center">
    <h1 className="text-3xl font-bold tracking-tight">
      Welcome Back
    </h1>
    <p className="text-sm text-muted-foreground">
      Sign in to continue to HireTrack.
    </p>
  </div>
  <div className="space-y-4">

      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        autoComplete="email"
        className="w-full rounded border p-3"
        />

      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        autoComplete="current-password"
        className="w-full rounded border p-3"
        />
</div>

      <button
        disabled={loading}
        className="h-11 w-full rounded-lg bg-primary font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
        {loading ? "Signing In..." : "Login"}
      </button>
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account yet.{" "}
        <Link href={"/register"} className="font-medium text-primary hover:underline" >Register Now</Link>
      </p>
    </form>
  );
}
