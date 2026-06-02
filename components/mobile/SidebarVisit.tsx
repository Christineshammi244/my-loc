"use client";
import React from "react";
import {
  Home,
  Search,
  Info,
  PhoneCall,
  ScrollText,
  ShieldAlert,
  LogIn,
  UserPlus,
  X,
} from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  // إذا كانت القائمة مغلقة لا تعرض شيئاً
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex justify-start font-sans"
      dir="rtl"
    >
      {/* الخلفية المظلمة الشفافة (Overlay) عند الضغط عليها تغلق القائمة */}
      <div
        className="fixed inset-0 bg-black/40 transition-opacity backdrop-blur-sm"
        onClick={onClose}
      />

      {/* جسم القائمة الجانبية الأبيض البيضاوي والمطابق لأبعاد الموبايل */}
      <div className="relative w-[280px] max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300">
        {/* زر إغلاق خفي للأمان في أعلى اليسار */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-1.5 rounded-full bg-slate-50 text-slate-400 hover:text-slate-600 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* القسم العلوي: الهيدر والشعار الإعلاني */}
        <div className="pt-12 pb-6 px-4 bg-gradient-to-b from-sky-50/50 to-white border-b border-gray-50">
          {/* أيقونة اللوغو المزرقة كالتصميم */}
          <div className="flex items-center justify-start gap-3 mb-2">
            <div className="p-1.5 w-12 h-12 bg-[#008bf1] text-white rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20 shrinnk-0">
              <Home className="w-6 h-6 stroke-[2]" />
            </div>
            <div className=" text-right">
              <h2 className=" font-black text-xl text-[#008bf1] tracking-tight leading-none">
                عقارك
              </h2>
              {/* اسم الموقع والعبارة الترويجية */}

              <p className="text-[10px] text-sky-400/90 font-bold mt-1 leading-none">
                ابحث عن منزل أحلامك
              </p>
            </div>
          </div>
        </div>

        {/* القسم الأوسط: روابط التنقل والقائمة */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {/* المجموعة الأولى: الروابط الرئيسية */}
          <div className="space-y-1">
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center justify-start gap-3 px-4 py-3 rounded-xl bg-sky-50/40 text-[#008bf1] font-black text-xs transition-all"
            >
              <Home className="w-4 h-4 shrink-0" />
              <span>الرئيسية</span>
            </Link>

            <Link
              href="/search"
              onClick={onClose}
              className="flex items-center justify-start gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 font-bold text-xs transition-all"
            >
              <Search className="w-4 h-4 shrink-0 text-slate-400" />
              <span>البحث</span>
            </Link>

            <Link
              href="/about"
              onClick={onClose}
              className="flex items-center justify-start gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 font-bold text-xs transition-all"
            >
              <Info className="w-4 h-4 shrink-0 text-slate-400" />
              <span>من نحن</span>
            </Link>

            <Link
              href="/contact"
              onClick={onClose}
              className="flex items-center justify-start gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 font-bold text-xs transition-all"
            >
              <PhoneCall className="w-4 h-4 shrink-0 text-slate-400" />
              <span>اتصل بنا</span>
            </Link>
          </div>

          {/* خط فاصل رمادي خفيف كالموجود بالتصميم تماماً */}
          <div className="border-t border-gray-100 my-2" />

          {/* المجموعة الثانية: الشروط والخصوصية */}
          <div className="space-y-1">
            <Link
              href="/terms"
              onClick={onClose}
              className="flex items-center justify-start gap-3 px-4 py-2.5 rounded-xl text-gray-400 hover:text-slate-600 font-bold text-[11px] transition-all"
            >
              <ScrollText className="w-3.5 h-3.5 shrink-0 text-gray-300" />
              <span>الشروط والأحكام</span>
            </Link>
            <Link
              href="/privacy"
              onClick={onClose}
              className="flex items-center justify-start gap-3 px-4 py-2.5 rounded-xl text-gray-400 hover:text-slate-600 font-bold text-[11px] transition-all"
            >
              <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-gray-300" />
              <span>سياسة الخصوصية</span>
            </Link>
          </div>
        </div>

        {/* القسم السفلي: أزرار التحكم بالحساب والمؤشر الأسفل */}
        <div className="p-4 border-t border-gray-50 bg-slate-50/30 space-y-2.5">
          {/* زر تسجيل الدخول الأزرق */}
          <Link
            href="/m/login"
            onClick={onClose}
            className="w-full bg-[#008bf1] text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#007cd7] transition-all shadow-sm"
          >
            <LogIn className="w-4 h-4" />
            <span>تسجيل الدخول</span>
          </Link>

          {/* زر إنشاء حساب المفرغ بخلفية بيضاء وحواف خفيفة */}
          <Link
            href="/m/create-account"
            onClick={onClose}
            className="w-full bg-white text-[#008bf1] border border-rose-100/50 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-50 transition-all shadow-sm"
          >
            <UserPlus className="w-4 h-4" />
            <span>إنشاء حساب</span>
          </Link>

          {/* خط الأمان الأسفل الأصفر الصغير الظاهر بأسفل الشاشة الدائرية */}
          <div className="flex justify-center pt-2">
            <div className="w-14 h-1 bg-amber-400/60 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
