"use client";

import Link from "next/link";
import { Home, LogOut } from "lucide-react";
import { adminNav, type NavKey } from "./nav-config";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

type SidebarProps = {
  active?: string;
  variant?: "default" | "identity";
};

export default function Sidebar({ active, variant = "default" }: SidebarProps) {
  const isIdentity = variant === "identity";
  const { user } = useUser();

  return (
    <aside
      className={cn(
        "flex h-full w-[260px] shrink-0 flex-col border-l border-slate-200 text-slate-700",
        "bg-white",
      )}
    >
      {/* الشعار والترويسة */}
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0b6ddf]">
          <Home className="h-5 w-5 text-white" strokeWidth={1.75} />
        </div>
        <div className="min-w-0">
          <p className="text-lg font-bold leading-tight text-slate-900">
            عقارك
          </p>
          <p className="text-xs text-slate-500">
            {isIdentity ? "لوحة تحكم المشرف" : "لوحة الإدارة"}
          </p>
        </div>
      </div>

      {/* قائمة التنقل الجانبية */}
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

      {/* معلومات المستخدم بالأسفل وزر تسجيل الخروج */}
      <div className="border-t border-slate-200 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5">
          
          {/* الحرف الأول من اسم المستخدم كصورة تعبيرية مؤقتة */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-300 to-amber-500 text-sm font-bold text-white">
            {user?.firstName?.charAt(0) || "أ"}
          </div>

          {/* عرض بيانات المستخدم المسجل ديناميكياً */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-900">
              {user?.firstName || "أحمد محمد"}
            </p>
            <p className="truncate text-xs text-slate-500">
              {(user?.publicMetadata?.role as string) || "مشرف رئيسي"}
            </p>
          </div>

          {/* زر تسجيل الخروج */}
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