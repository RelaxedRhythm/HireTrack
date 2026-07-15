"use client";

import { useState } from "react";
import { signup } from "@/actions/auth";

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
      className="w-full max-w-md rounded-lg border p-8 space-y-4"
    >
      <h1 className="text-3xl font-bold text-center">
        Create Account
      </h1>

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

      <button
        disabled={loading}
        className="w-full rounded bg-black py-3 text-white"
      >
        {loading ? "Creating..." : "Sign Up"}
      </button>
    </form>
  );
}