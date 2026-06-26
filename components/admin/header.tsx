"use client";

import { Bell, Search, Settings } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type HeaderProps = {
  searchPlaceholder: string;
  searchValue?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchClick?: () => void;
};

export default function Header({ 
  searchPlaceholder, 
  searchValue, 
  onSearchChange, 
  onSearchClick 
}: HeaderProps) {
  
  const { user } = useUser();
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchValue) {
      const cleanId = searchValue.replace(/\D/g, "");
      if (cleanId) {
        router.push(`/admin/properties/${cleanId}`);
      }
    }
  };

  return (
    <header className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 bg-white/90 px-6 py-4 backdrop-blur">
      
      <div className="relative min-w-[200px] flex-1 max-w-2xl">
        <Search className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          placeholder={searchPlaceholder || "بحث عن مستخدم , عقار , أو معاملة..."}
          value={searchValue}
          onChange={onSearchChange}
          onKeyDown={handleKeyDown} // للبحث عند ضغط Enter
          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pr-11 pl-4 text-sm text-slate-800 outline-none ring-[#00A76F]/30 transition placeholder:text-slate-400 focus:border-[#00A76F] focus:bg-white focus:ring-2"
        />
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="relative rounded-xl p-2 text-slate-500 transition hover:bg-slate-100"
            aria-label="الإشعارات"
          >
            <Bell className="h-5 w-5" strokeWidth={1.75} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>
          
          <button
            type="button"
            className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100"
            aria-label="الإعدادات"
          >
            <Settings className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>

        <div className="h-6 w-[1px] bg-slate-200 hidden xs:block"></div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="text-right hidden md:block leading-tight">
            <p className="text-sm font-bold text-slate-900">
              {user?.fullName || "جاري التحميل..."}
            </p>
            <p className="text-[10px] text-emerald-600 font-medium">
              {user?.publicMetadata?.role === 'admin' ? 'مشرف رئيسي' : 'مستخدم نشط'}
            </p>
          </div>

          <UserButton />
        </div>

      </div>
    </header>
  );
}