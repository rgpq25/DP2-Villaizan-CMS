"use client";

import { redirect } from "next/navigation";
import Sidebar from "./_components/sidebar";
import useSessionContext from "@web/hooks/useSessionContext";

function AdminLayout({ children }: { children: React.ReactNode }) {
  const { session } = useSessionContext();

  if (!session) {
    redirect("/login?callbackUrl=/admin");
  }

  // if (session.user.vi_rol?.nombre !== "Administrador") {
  //   redirect("/");
  // }

  // if (user.vi_persona?.sexo === null || user.vi_persona?.edad === null) {
  //   redirect("/ultimo-paso");
  // }

  return (
    <div className="bg-primary-foreground flex h-screen flex-col lg:flex-row">
      <Sidebar user={session.user} />
      <div className="flex h-full w-full flex-1 pt-[57px] lg:ml-[200px] lg:pt-0">{children}</div>
    </div>
  );
}
export default AdminLayout;
