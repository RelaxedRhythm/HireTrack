import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import ProfileForm from "../../components/profile-form";
import { getCurrentUser } from "@/lib/session";

export default async function SettingsPage() {
  const session=await getCurrentUser();

  const user = await prisma.user.findUnique({
    where: {
      id: session.id,
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Profile</h1>

      <div>
        <p>Name : {user?.name}</p>

        <p>Email : {user?.email}</p>

        <p>Role : {user?.role}</p>
      </div>
      <ProfileForm name={user?.name ?? ""} />
    </div>
  );
}
