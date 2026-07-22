import { BriefcaseBusiness } from "lucide-react";
// import Link from "next/link"; 
import { auth } from "../../auth";
import LogoutButton from "./logout-btns";
import ThemeSwitcher from "./themeSwitcher";
import Link from "next/link";

export default async function Navbar() {
  const session = await auth();

  const initials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <header className="sticky top-0 z-40 h-16 border-b bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="flex h-full items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <BriefcaseBusiness className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-base font-semibold tracking-tight">
              HireTrack
            </h1>
            <p className="hidden text-xs text-muted-foreground sm:block">
              Applicant Tracking System
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
        <ThemeSwitcher />


        {/* Right Section */}
        {session ? (
          <>
      <div className="hidden h-8 w-px bg-border md:block" />

      <div className="flex items-center gap-3 rounded-full border bg-card/50 px-3 py-1.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-sm font-semibold text-primary-foreground">
          {initials}
        </div>

        <div className="hidden sm:flex sm:flex-col">
          <span className="text-sm font-medium leading-none">
            {session.user?.name}
          </span>

          <span className="text-xs text-muted-foreground">
            Recruiter
          </span>
        </div>
      </div>

      <LogoutButton />
    </>
  ) : (
    
    <Link
      href="/login"
      className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
      >
      Login
    </Link>

  )}
      </div>
</div>
    </header>
  );
}