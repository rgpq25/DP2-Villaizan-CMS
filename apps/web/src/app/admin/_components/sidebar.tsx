"use client";

import { Usuario } from "@web/types";
import { ChartColumnBig, LogOut, MapPin, Newspaper, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";
import { handleSignOut } from "../../../../actions/authActions";
import Avatar from "../../../../public/avatar.png";

type sidebarItem = {
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
};

const iconStyle = "shrink-0 w-5 h-5 stroke-white";
const sidebarItems: sidebarItem[] = [
  {
    path: "/admin/contenido",
    icon: Newspaper,
    label: "Contenido",
  },
  {
    path: "/admin/usuarios",
    icon: User,
    label: "Usuarios",
  },
  {
    path: "/admin/puntos-venta",
    icon: MapPin,
    label: "Ubicaciones",
  },
  {
    path: "/admin/dashboard-sentimientos",
    icon: ChartColumnBig,
    label: "Dashboard",
  },
];

function Sidebar({ user }: { user: Usuario }) {
  const pathname = usePathname();
  const buttonStyle = [buttonVariants({ variant: "ghost" }), "hover:bg-red-900"];

  return (
    <aside className="fixed flex w-full items-start justify-start bg-red-700 px-2 py-2 lg:h-screen lg:w-[200px] lg:flex-col lg:py-3">
      <header className="w-full">
        <Link href={"/"} className="flex h-fit w-full items-center gap-2 px-1 py-1">
          <Image
            src={"/VillaizanLogoV.png"}
            alt="Logo"
            className="aspect-square w-[35px]"
            height={1000}
            width={1000}
          />
          <p className="text-lg font-semibold text-white">Villaizan</p>
        </Link>
      </header>
      <main className="mt-3 flex w-full items-start gap-1 lg:flex-col">
        {sidebarItems.map((item, idx) => {
          const ItemIcon = item.icon;
          return (
            <Link
              key={idx}
              className={cn(
                buttonStyle,
                "flex w-full items-center justify-start gap-2 px-2",
                pathname === item.path ? "bg-red-800" : ""
              )}
              href={item.path}
            >
              <ItemIcon className={iconStyle} />
              <p className="truncate font-medium text-white">{item.label}</p>
            </Link>
          );
        })}
      </main>

      <footer className="mt-auto flex w-full items-center gap-1 lg:flex-col">
        <Button
          variant={"ghost"}
          className={cn(buttonStyle[1], "flex h-auto w-full items-center gap-1 px-2 py-2")}
          onClick={handleSignOut}
        >
          <Image
            alt="Profile picture"
            src={user.imagenperfil || "/default-profile.png"}
            width={1000}
            height={1000}
            className="h-8 w-8 rounded-md bg-black"
          />
          <div className="flex flex-1 flex-col items-start justify-start overflow-hidden leading-tight">
            <p className="truncate font-medium text-white">{user.nombre}</p>
            <label className="w-full flex-1 truncate text-xs font-normal text-white">{user.correo}</label>
          </div>
          <LogOut className="h-4 w-4 shrink-0 stroke-white" />
        </Button>
      </footer>
    </aside>
  );
}
export default Sidebar;
