"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  ClipboardList,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/jobs", label: "Jobs", icon: Briefcase },
  { href: "/candidates", label: "Candidates", icon: Users },
  { href: "/applications", label: "Applications", icon: ClipboardList },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 border-r border-border/40 bg-background/50 backdrop-blur-xs flex flex-col justify-between py-6 shrink-0">
      <nav className="flex flex-col gap-1 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          // Exact match for dashboard, startswith for subpages (e.g. jobs/new)
          const isActive = item.href === "/dashboard" 
            ? pathname === "/dashboard"
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 outline-none select-none",
                isActive
                  ? "bg-secondary text-secondary-foreground font-semibold shadow-xs"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground active:translate-y-px"
              )}
            >
              <Icon className={cn("h-4 w-4 shrink-0 transition-transform duration-200", isActive ? "text-primary" : "text-muted-foreground")} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-6 text-[10px] uppercase tracking-wider text-muted-foreground/45 font-semibold">
        HireTrack v1.0.0
      </div>
    </aside>
  );
}