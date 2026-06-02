import React from "react";
import Footer from "@/components/mobile/Footer";
import Link from "next/link";
import {
  CheckCircle2,
  Bell,
  User,
  Home,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

export default function PropertySuccessPage() {
  return (
    <div
      className="min-h-screen bg-white flex flex-col justify-between font-sans antialiased selection:bg-sky-100"
      dir="rtl"
    >
      {/* 1. الهيدر العلوي للمنصة (User Header) */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-md mx-auto w-full">
        {/* شعار عقارك على اليسار */}
        <div className="flex items-center gap-1.5 text-[#008bf1] font-black text-lg">
          <span>عقارك</span>
          <div className="bg-[#008bf1] text-white p-1 rounded-xl">
            <Home className="w-5 h-5" />
          </div>
        </div>
        {/* أزرار الحساب والإشعارات على اليمين في واجهة المستخدم */}
        <div className="flex items-center gap-3">
          <Link
            href="/m/profile"
            className="p-2 rounded-full bg-slate-50 border border-gray-100 text-sky-500 hover:bg-slate-100 transition-all"
          >
            <User className="w-4 h-4" />
          </Link>
          <Link
            href="/m/notifications"
            className="p-2 rounded-full bg-slate-50 border border-gray-100 text-gray-400 hover:bg-slate-100 transition-all relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 start-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
          </Link>
        </div>
      </header>

      {/* 2. محتوى صفحة النجاح المركزية */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8 max-w-md mx-auto w-full text-center">
        {/* أنيميشن الدائرة المضيئة وأيقونة النجاح */}
        <div className="relative mb-6 flex items-center justify-center">
          {/* تأثير التوهج الخلفي الأصفر الخفيف */}
          <div className="absolute w-40 h-40 bg-amber-200/60 rounded-full filter blur-xl animate-pulse"></div>

          {/* الدائرة الزرقاء الكبيرة */}
          <div className="relative z-10 w-24 h-24 bg-[#1e40af] rounded-full flex items-center justify-center shadow-lg shadow-blue-900/10 border-4 border-white">
            <CheckCircle2 className="w-12 h-12 text-white stroke-[2.5]" />
          </div>

          {/* الأيقونة الصغيرة الذهبية الجانبية (مفتاح/عقد) */}
          <div className="absolute bottom-0 start-0 bg-amber-400 text-slate-900 p-1.5 rounded-lg shadow-md border border-white z-20">
            <svg
              className="w-3.5 h-3.5 font-bold"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              ></path>
            </svg>
          </div>
        </div>

        {/* عنوان نجاح العملية */}
        <h1 className="text-lg font-black text-slate-800 mb-4 tracking-tight">
          تم إرسال عقارك للمراجعة بنجاح
        </h1>

        {/* صندوق التنبيه الأزرق الخفيف */}
        <div className="bg-sky-50/60 border border-sky-100/50 rounded-2xl p-5 mb-8 w-full max-w-sm">
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            سيقوم فريق الإدارة بمراجعة تفاصيل العقار خلال{" "}
            <span className="text-[#008bf1] font-bold">24 ساعة</span> القادمة.
            سيتم إشعارك فور الموافقة عليه ونشره في المنصة.
          </p>
        </div>

        {/* أزرار التحكم والتنقل الملونة */}
        <div className="w-full max-w-sm space-y-3 mb-8">
          <button className="w-full bg-[#008bf1] text-white py-3 rounded-xl font-bold text-xs hover:bg-[#007cd7] transition-all shadow-sm shadow-blue-500/10">
            الذهاب إلى عقاراتي
          </button>

          <Link
            href="/m/add-property"
            className="w-full bg-white text-slate-700 border border-rose-100 py-3 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all"
          >
            العودة للرئيسية
          </Link>
        </div>
        {/* البانر الإعلاني أو التوضيحي الأسفل (البطاقة الخضراء من التصميم) */}
        <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-sm border border-gray-100 aspect-[2.5/1] bg-[#4f8a83] flex items-center justify-center p-4 text-white relative">
          <div className="text-center opacity-80 space-y-1 select-none">
            <p className="text-[10px] uppercase font-mono tracking-widest">
              Clear design, clear life
            </p>
            <p className="text-[9px] font-light">
              Explore our premium properties tailored for you
            </p>
          </div>
        </div>
      </main>

      {/* 3. الفوتر السفلي العادي للمنصة (User Footer) */}
      <Footer isHome={false} />
    </div>
  );
}
