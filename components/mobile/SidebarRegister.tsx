"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  PlusCircle,
  FileText,
  Search,
  User,
  History,
  MessageSquare,
  Bell,
  Headphones,
  Settings,
  LogOut,
  ChevronLeft,
  ArrowLeftRight,
  CheckCircle2,
  X,
} from "lucide-react";

// تعريف الـ Props القادمة من الصفحة الأب
interface UserSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserSidebar({ isOpen, onClose }: UserSidebarProps) {
  const pathname = usePathname();

  // State خاص بتبديل وضع المستخدم (بائع / مشتري)
  const [userMode, setUserMode] = useState<"seller" | "buyer">("seller");

  const mainNavItems = [
    { name: "الرئيسية", href: "/", icon: Home },
    { name: "أضف عقار", href: "/add-property", icon: PlusCircle },
    { name: "طلب شراء", href: "/buy-request", icon: FileText },
    { name: "البحث", href: "/search", icon: Search },
    { name: "الملف الشخصي", href: "/profile", icon: User },
    { name: "سجل المبيعات / المشتريات", href: "/history", icon: History },
    { name: "التعليقات", href: "/comments", icon: MessageSquare },
    { name: "الإشعارات", href: "/notifications", icon: Bell },
  ];

  const subNavItems = [
    { name: "الدعم الفني", href: "/support", icon: Headphones },
    { name: "الإعدادات", href: "/settings", icon: Settings },
  ];

  return (
    <div dir="rtl">
      {/* 1. الخلفية الشفافة المعتمة (Overlay) وتغلق القائمة عند الضغط عليها */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[999] transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* 2. جسم القائمة الجانبية المنزلقة */}
      <div
        className={`fixed top-0 right-0 w-72 bg-white h-screen z-[1000] border-l border-gray-150 flex flex-col justify-between overflow-y-auto shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* زر إغلاق (X) علوي لتجربة مستخدم أفضل */}
        <div className="absolute top-4 left-4">
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* القسم العلوي الداخلي */}
        <div className="flex flex-col">
          {/* كرت بيانات المستخدم الشخصية */}
          <div className="flex items-center gap-3 p-4 pt-6">
            <div className="relative w-12 h-12 shrink-0">
              <img
                src="/avatar-placeholder.jpg"
                alt="User avatar"
                className="w-full h-full rounded-full object-cover border border-gray-100"
              />
              <div className="absolute bottom-0 right-0 bg-white rounded-full p-0.5 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              </div>
            </div>
            <div className="flex flex-col text-right">
              <h3 className="font-bold text-gray-900 text-sm">أحمد المصطفى</h3>
              <span className="text-[11px] font-semibold text-amber-500">
                تم توثيق الحساب
              </span>
              <span className="text-[10px] text-gray-400 mt-0.5">
                عقارك سوريا - دمشق
              </span>
            </div>
          </div>

          <div className="border-b border-gray-100 my-1"></div>

          {/* صندوق تبديل وضع المستخدم (بائع / مشتري) */}
          <div className="mx-4 my-2 p-3 bg-gray-50 rounded-2xl border border-gray-100/80">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <ArrowLeftRight className="w-3.5 h-3.5 text-[#0091dc]" />
                <span className="text-xs font-bold text-gray-800">
                  وضع المستخدم
                </span>
              </div>
              <span className="text-[9px] font-bold bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full">
                نشط الآن
              </span>
            </div>

            <div className="bg-gray-200/60 p-0.5 rounded-xl flex gap-1 relative z-[1002]">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setUserMode("seller");
                }}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all text-center ${
                  userMode === "seller"
                    ? "bg-[#0091dc] text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                بائع
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setUserMode("buyer");
                }}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all text-center ${
                  userMode === "buyer"
                    ? "bg-[#0091dc] text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                مشتري
              </button>
            </div>
            <p className="text-[9px] text-gray-400 text-center mt-2">
              قم بالتبديل بين وضع البائع والمشتري لإدارة عقاراتك
            </p>
          </div>

          {/* القائمة الأساسية الأولى */}
          <nav className="px-3 py-2 space-y-0.5">
            {mainNavItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose} // تغلق القائمة تلقائياً عند الانتقال لصفحة أخرى
                  className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-blue-50/50 text-[#0091dc]"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent
                      className={`w-4 h-4 ${isActive ? "text-[#0091dc]" : "text-gray-400"}`}
                    />
                    <span>{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="border-b border-gray-100 mx-4 my-2"></div>

          {/* القائمة الثانية */}
          <nav className="px-3 space-y-0.5">
            {subNavItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-blue-50/50 text-[#0091dc]"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <IconComponent
                    className={`w-4 h-4 ${isActive ? "text-[#0091dc]" : "text-gray-400"}`}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* القسم السفلي */}
        <div className="flex flex-col pt-4">
          <div className="border-b border-gray-100 mb-2"></div>
          <div className="px-3 mb-4"></div>
          <button
            type="button"
            onClick={() => alert("تم تسجيل الخروج")}
            className="w-full flex items-center justify-between p-2 rounded-xl bg-red-50/40 hover:bg-red-50 text-red-600 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-red-50 rounded-lg">
                <LogOut className="w-4 h-4 text-red-500 transform rotate-180" />
              </div>
              <span className="text-xs font-bold">تسجيل الخروج</span>
            </div>
            <ChevronLeft className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        <div className="p-4 bg-gray-50/50 border-t border-gray-100 text-center">
          <div className="flex justify-center gap-3 text-[10px] font-bold text-[#0091dc] mb-1.5">
            <Link href="/privacy" className="hover:underline">
              سياسة الخصوصية
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/terms" className="hover:underline">
              شروط الاستخدام
            </Link>
          </div>
          <p className="text-[9px] text-gray-400 font-medium">
            © 2026 عقارك سوريا. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </div>
  );
}
