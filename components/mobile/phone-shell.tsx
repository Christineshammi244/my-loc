 "use client";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { useState, type ReactNode } from "react";
import Link from "next/link";
import {
  Bell,
  Home,
  Instagram,
  Menu,
  HomeIcon,
  Search,
  Twitter,
  X,
  User,
} from "lucide-react";

type PhoneShellProps = {
  title: string;
  children: ReactNode;
  withFooter?: boolean;
  onMenuClick?: () => void;
};

export function PhoneShell({
  onMenuClick,
  title,
  children,
  withFooter = true,
}: PhoneShellProps): React.JSX.Element {
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
          <p  className="text-blue-600 font-extrabold text-xl">القائمة</p>
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
        <nav
          className="w-full flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-50"
          dir="rtl"
        >
          <div className="flex-1 flex justify-start gap-2">
            <button
              onClick={() => setIsMenuOpen(true)}
              type="button"
              className=" text-[#1286c8] text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors shadow-sm"
            >
              <Menu size={20} />
              <span className="absolute top-5 right-4 bg-red-500 w-2 h-2 rounded-full border-2 border-white"></span>
            </button>
                <Link
              href="/m/home-registered"
              className="flex-2 flex items-center  "
            >
              <div className="bg-[#1286c8] p-1.5 rounded-xl ">
                <HomeIcon size={26} className=" text-white " />
              </div>
              <h1 className="text-4xl font-extrabold text-[#1286c8] px-1 tracking-tight">
                عقارك
              </h1>
            </Link>
          </div>
          {/* التنبيهات والصورة الشخصية */}
          <div className="flex items-center gap-4">
            <Link
              href="/m/notifications"
              className="text-gray-600 hover:text-gray-900 relative"
            >
              <Bell size={22} />
            </Link>
            {/* الصورة الشخصية كما بالخلفية */}
            <Link href="/m/profile">
              <div className="w-9 h-9 rounded-full bg-[#fcefdc] border-2 border-[#f3d09e] flex items-center justify-center overflow-hidden cursor-pointer">
                <User size={18} className="text-sm" />
              </div>
            </Link>
          </div>
        </nav>
      </header>

      <main className="space-y-4 px-3 py-4">{children}</main>

      {withFooter ? (
        <footer className="bg-white text-gray-600 py-8 px-6 border-t border-gray-100 font-sans">
          <div
            className="max-w-6xl mx-auto flex flex-col items-center gap-6 text-center "
            dir="rtl"
          >
            <div className="flex items-center gap-2 text-2xl font-bold text-[#1286c8] ">
              <Home
                className="bg-[#1286c8] p-1.5 rounded-lg flex items-center justify-center text-white"
                size={28}
              />
              <span>عقارك</span>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm font-medium">
              <span className="hover:text-black cursor-pointer">عن المنصة</span>
              <span className="hover:text-black cursor-pointer">
                الشروط والأحكام
              </span>
              <span className="hover:text-black cursor-pointer">
                سياسة الخصوصية
              </span>
              <span className="hover:text-black cursor-pointer">اتصل بنا</span>
            </div>

            <div className="flex gap-5">
              <div className="p-2 bg-gray-100 rounded-full hover:bg-gray-100 cursor-pointer transition-colors text-black">
                <FaFacebook size={20} />
              </div>
              <div className="p-2 bg-gray-100 rounded-full hover:bg-gray-100 cursor-pointer transition-colors text-black">
                <FaTwitter size={20} />
              </div>
              <div className="p-2 bg-gray-100 rounded-full hover:bg-gray-100 cursor-pointer transition-colors text-black">
                <FaInstagram size={20} />
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-2">
              © 2026 عقارك سوريا. جميع الحقوق محفوظة.
            </p>
          </div>
        </footer>
      ) : null}
    </div>
  );
}