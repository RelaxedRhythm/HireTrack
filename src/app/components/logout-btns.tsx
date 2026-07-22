"use client";

import { logout } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <form action={logout}>
      <Button
        variant="ghost"
        size="sm"
        type="submit"
        className="text-muted-foreground hover:text-foreground hover:bg-muted/85 gap-1.5 h-8 px-2.5"
      >
        <LogOut className="h-3.5 w-3.5" />
        <span className="text-xs font-medium">Logout</span>
      </Button>
    </form>
  );
}