"use client";

import { logout } from "@/actions/auth";

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button
        className="rounded bg-red-500 px-4 py-2 text-white"
      >
        Logout
      </button>
    </form>
  );
}