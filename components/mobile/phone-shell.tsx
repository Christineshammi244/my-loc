"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Bell, Home, Instagram, Menu, Search, Twitter, X } from "lucide-react";

type PhoneShellProps = {
  title: string;
  children: ReactNode;
  withFooter?: boolean;
};

export function PhoneShell({ title, children, withFooter = true }: PhoneShellProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    ["/m/home", "الرئيسية"],
    ["/m/search-results", "نتائج البحث"],
    ["/m/favorites", "المفضلة"],
    ["/m/my-purchases", "مشترياتي"],
    ["/m/comments", "التعليقات"],
    ["/m/notifications", "الإشعارات"],
    ["/m/profile", "الملف الشخصي"],
    ["/m", "كل الصفحات"],
  ] as const;

  return (
    <div className="mx-auto min-h-screen w-full max-w-[390px] bg-[#f3f4f6] text-slate-800 shadow-sm">
      {isMenuOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-slate-900/40"
          aria-label="إغلاق القائمة"
          onClick={() => setIsMenuOpen(false)}
        />
      ) : null}

      <aside
        className={`fixed top-0 right-0 z-50 h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <p className="text-lg font-extrabold text-[#1f84da]">القائمة</p>
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-xl transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e84d6]/40"
            aria-label="إغلاق"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="space-y-1 p-3">
          {menuItems.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      <header className="sticky top-0 z-20 border-b border-slate-200 bg-[#f9f9fb] px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-slate-700">
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e84d6]/40"
              aria-label="فتح القائمة"
            >
              <Menu className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e84d6]/40"
            >
              <Bell className="h-5 w-5" />
            </button>
          </div>
          <div className="flex items-center gap-2 text-[#1f84da]">
            <span className="text-3xl leading-none">◼</span>
            <span className="text-3xl leading-none">◻</span>
            <p className="text-3xl font-bold">عقارك</p>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <h1 className="text-[34px] font-extrabold tracking-tight text-slate-900">{title}</h1>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e84d6]/40"
            aria-label="بحث"
          >
            <Search className="h-6 w-6 text-slate-700" />
          </button>
        </div>
      </header>

      <main className="space-y-4 px-3 py-4">{children}</main>

      {withFooter ? (
        <footer className="mt-8 border-t border-slate-200 bg-[#f9f9fb] px-4 py-6 text-center">
          <div className="mb-4 flex items-center justify-center gap-2 text-[#1f84da]">
            <Home className="h-5 w-5 rounded-md bg-[#1f84da] p-1 text-white" />
            <p className="text-3xl font-bold">عقارك</p>
          </div>
          <div className="mb-4 flex justify-center gap-6 text-sm text-slate-600">
            <Link href="#" className="hover:text-slate-900">
              عن المنصة
            </Link>
            <Link href="#" className="hover:text-slate-900">
              الشروط والأحكام
            </Link>
            <Link href="#" className="hover:text-slate-900">
              سياسة الخصوصية
            </Link>
          </div>
          <div className="mb-3 flex justify-center gap-5 text-slate-800">
            <Instagram className="h-5 w-5" />
            <Twitter className="h-5 w-5" />
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-700 text-xs">
              f
            </span>
          </div>
          <p className="text-xs text-slate-500">© 2026 عقارك سوريا، جميع الحقوق محفوظة</p>
        </footer>
      ) : null}
    </div>
  );
}
