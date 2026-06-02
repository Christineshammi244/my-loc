import type { ReactNode } from "react";
import type { NavKey } from "./nav-config";
import Header from "./header";
import Sidebar from "./sidebar";

type AdminShellProps = {
  children: ReactNode;
  activeNav: NavKey;
  searchPlaceholder: string;
  sidebarVariant?: "default" | "identity";
  searchValue?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchClick?: () => void;
};

export function AdminShell({
  children,
  activeNav,
  searchPlaceholder,
  sidebarVariant = "default",
  searchValue,
  onSearchChange,
  onSearchClick,
}: AdminShellProps) {
  return (
    <div className="flex min-h-screen bg-[#F4F6F8]">
      <Sidebar active={activeNav} variant={sidebarVariant} />
      <main className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Header searchPlaceholder={searchPlaceholder} searchValue={searchValue} onSearchChange={onSearchChange} onSearchClick={onSearchClick}/>
        <div className="flex-1 p-6">{children}</div>
      </main>
    </div>
  );
}
