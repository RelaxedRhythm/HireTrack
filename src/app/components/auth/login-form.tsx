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
      className="w-full max-w-md rounded-lg border p-8 space-y-4"
    >
      <h1 className="text-3xl font-bold text-center">
        Login
      </h1>

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

      <button
        disabled={loading}
        className="w-full rounded bg-black py-3 text-white"
      >
        {loading ? "Signing In..." : "Login"}
      </button>
      <p>Don`&apos`t have an account yet. <Link href={"/register"}>Register Now</Link></p>
    </form>
  );
}