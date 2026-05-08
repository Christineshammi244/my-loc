import type { ReactNode } from "react";
import type { NavKey } from "./nav-config";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

type AdminShellProps = {
  children: ReactNode;
  activeNav: NavKey;
  searchPlaceholder: string;
  sidebarVariant?: "default" | "identity";
};

export function AdminShell({
  children,
  activeNav,
  searchPlaceholder,
  sidebarVariant = "default",
}: AdminShellProps) {
  return (
    <div className="flex min-h-screen bg-[#F4F6F8]">
      <Sidebar active={activeNav} variant={sidebarVariant} />
      <main className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Header searchPlaceholder={searchPlaceholder} />
        <div className="flex-1 p-6">{children}</div>
      </main>
    </div>
  );
}
