import Link from "next/link";
import { Home, LogOut } from "lucide-react";
import { adminNav, type NavKey } from "./nav-config";
import { cn } from "@/lib/utils";

type SidebarProps = {
  active: NavKey;
  variant?: "default" | "identity";
};

export function Sidebar({ active, variant = "default" }: SidebarProps) {
  const isIdentity = variant === "identity";

  return (
    <aside
      className={cn(
        "flex h-full w-[260px] shrink-0 flex-col border-l border-slate-200 text-slate-700",
        "bg-white",
      )}
    >
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0b6ddf]">
          <Home className="h-5 w-5 text-white" strokeWidth={1.75} />
        </div>
        <div className="min-w-0">
          <p className="text-lg font-bold leading-tight text-slate-900">عقارك</p>
          <p className="text-xs text-slate-500">
            {isIdentity ? "لوحة تحكم المشرف" : "لوحة الإدارة"}
          </p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 pb-4">
        {adminNav.map((item) => {
          const Icon = item.icon;
          const selected = item.key === active;
          return (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                selected
                  ? "bg-[#e9f5ff] text-[#1e88c9]"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 shrink-0",
                  selected ? "text-[#1e88c9]" : "text-slate-500",
                )}
                strokeWidth={1.75}
              />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-300 to-amber-500 text-sm font-bold text-white">
            أ
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-900">أحمد محمد</p>
            <p className="truncate text-xs text-slate-500">مشرف رئيسي</p>
          </div>
          <button
            type="button"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
            aria-label="تسجيل الخروج"
          >
            <LogOut className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </aside>
  );
}
