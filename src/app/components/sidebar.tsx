import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="w-64 border-r bg-background">
      
      <nav className="flex flex-col gap-2 px-4">
        <Link href="/dashboard" className="rounded px-3 py-2 hover:bg-accent">
          Dashboard
        </Link>

        <Link href="/jobs" className="rounded px-3 py-2 hover:bg-accent">
          Jobs
        </Link>

        <Link
          href="/candidates"
          className="rounded px-3 py-2 hover:bg-accent"
        >
          Candidates
        </Link>
        <Link
          href="/applications"
          className="rounded px-3 py-2 hover:bg-accent"
        >
          Applications
        </Link>

        <Link href="/settings" className="rounded px-3 py-2 hover:bg-accent">
          Settings
        </Link>
      </nav>
    </aside>
  );
}