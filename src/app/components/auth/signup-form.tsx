"use client";

import { useState } from "react";
import { signup } from "@/actions/auth";
import Link from "next/link";

export function SignupForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);

    await signup(formData);

    setLoading(false);
  }

  return (
    <form
      action={handleSubmit}
       className="w-full max-w-md space-y-6 rounded-2xl border border-border bg-card p-8 shadow-sm"
    >
      <div className="space-y-2 text-center">
    <h1 className="text-3xl font-bold tracking-tight">
      New Here! 
    </h1>
    <p className="text-sm text-muted-foreground">
      Create an account
    </p>
  </div>
  <div className="space-y-4"> 


      <input
        name="name"
        placeholder="Full Name"
        className="w-full rounded border p-3"
        />

      <input
        name="email"
        type="email"
        placeholder="Email"
        className="w-full rounded border p-3"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        className="w-full rounded border p-3"
        />

      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        className="w-full rounded border p-3"
        />

</div>
      <button
        disabled={loading}
        className="h-11 w-full rounded-lg bg-primary font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
        >
        {loading ? "Creating..." : "Sign Up"}
      </button>
      <p>Already have an account? <Link href={"/login"} className="font-medium text-primary hover:underline">Sign-In</Link></p>
    </form>
  );
}