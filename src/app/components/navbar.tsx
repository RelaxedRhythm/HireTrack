import {auth} from "@/auth"
import LogoutButton from "./logout-btns";

export default async function Navbar() {
  const session=await auth()
  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      <h1 className="text-xl font-semibold">HireTrack</h1>

      <div className="flex items-center gap-4">
        <span>{session?.user.name}</span>
        {/* Theme Toggle */}
        {/* User Avatar */}
        <LogoutButton/>
      </div>
    </header>
  );
}