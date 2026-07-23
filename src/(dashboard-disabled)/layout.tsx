import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "../app/components/sidebar";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-muted/40">
      <div className="flex min-h-screen">
        <div className="flex flex-1 flex-col">
         
           <div className="flex min-h-screen">
              {/* Sidebar */}
              <Sidebar />
              <main className="container mx-auto px-6 py-6">{children}</main>
            </div>
        </div>
      </div>
    </div>
  );
}
