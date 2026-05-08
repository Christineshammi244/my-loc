import { Bell, Search, Settings } from "lucide-react";

type HeaderProps = {
  searchPlaceholder: string;
};

export function Header({ searchPlaceholder }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 bg-white/90 px-6 py-4 backdrop-blur">
      <div className="relative min-w-[200px] flex-1 max-w-2xl">
        <Search className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          placeholder={searchPlaceholder}
          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pr-11 pl-4 text-sm text-slate-800 outline-none ring-[#00A76F]/30 transition placeholder:text-slate-400 focus:border-[#00A76F] focus:bg-white focus:ring-2"
        />
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden items-center gap-3 sm:flex">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 text-sm font-bold text-white">
            أ
          </div>
          <div className="text-right leading-tight">
            <p className="text-sm font-semibold text-slate-900">أحمد محمد</p>
            <p className="text-xs text-slate-500">مشرف رئيسي</p>
          </div>
        </div>
        <button
          type="button"
          className="rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          aria-label="الإعدادات"
        >
          <Settings className="h-5 w-5" strokeWidth={1.75} />
        </button>
        <button
          type="button"
          className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          aria-label="الإشعارات"
        >
          <Bell className="h-5 w-5" strokeWidth={1.75} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>
      </div>
    </header>
  );
}
