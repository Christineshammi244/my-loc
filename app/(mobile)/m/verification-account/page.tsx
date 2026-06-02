"use client"; // جعلنا الصفحة كاملاً Client لتفادي أي أخطاء تفاعلية فوراً

import React from "react";
import { ArrowRight, ShieldCheck, Info, UploadCloud, User } from "lucide-react";
import DocumentTypeSelector from "@/components/mobile/DocumentTypeSelector";
import Link from "next/link";

export default function VerificationPage() {
  return (
    <div
      className="min-h-screen bg-white flex flex-col justify-between font-sans antialiased selection:bg-sky-100"
      dir="rtl"
    >
      {/* 1. الهيدر العلوي المبسط */}
      <header className="bg-white border-b border-gray-50/80 px-6 py-4 flex items-center justify-between max-w-md mx-auto w-full">
        {/* زر سهم العودة للخلف (يسار في RTL ليطابق سهم الصورة) */}
        <Link
          href="/m/create-account"
          className="p-2 rounded-full hover:bg-slate-50 text-slate-700 transition-all"
        >
          <ArrowRight className="w-5 h-5" />
        </Link>

        {/* عنوان الصفحة المركزي */}
        <h1 className="text-sm font-black text-slate-800 tracking-tight">
          توثيق الحساب
        </h1>

        {/* زر الملف الشخصي الجانبي الخفيف */}
        <Link
          href="/m/profile"
          className="p-2 rounded-full bg-sky-50 text-[#008bf1] border border-sky-100/30"
        >
          <User className="w-4 h-4" />
        </Link>
      </header>

      {/* 2. محتوى صفحة التوثيق */}
      <main className="flex-1 max-w-md mx-auto w-full px-6 py-6 flex flex-col justify-start">
        {/* أيقونة درع الحماية المركزي الكبير */}
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 bg-blue-50 text-[#008bf1] rounded-full flex items-center justify-center shadow-inner">
            <ShieldCheck className="w-8 h-8 stroke-[1.8]" />
          </div>
        </div>

        {/* نصوص العنوان والترحيب */}
        <div className="text-center mb-6">
          <h2 className="text-lg font-black text-slate-800 tracking-tight">
            تحقق من الهوية
          </h2>
          <p className="text-xs text-gray-400 mt-1.5 font-medium leading-relaxed max-w-xs mx-auto">
            يرجى تحميل الوثائق المطلوبة لإتمام عملية التحقق من حسابك في{" "}
            <span className="text-[#008bf1] font-bold">عقارك سوريا</span>
          </p>
        </div>

        {/* تنبيه حالة الحساب الزرقاء */}
        <div className="bg-sky-50/50 border border-sky-100 rounded-2xl p-4 mb-6 flex items-start gap-3">
          <Info className="w-4 h-4 text-[#008bf1] shrink-0 mt-0.5" />
          <div className="text-right">
            <p className="text-xs font-bold text-blue-900">حالة الحساب</p>
            <p className="text-[14px] text-blue-700/80 mt-0.5 leading-relaxed font-medium">
              حسابك قيد المراجعة حالياً من قبل الإدارة. يرجى الانتظار حتى يتم
              التحقق من بياناتك.
            </p>
          </div>
        </div>

        {/* استدعاء مكون اختيار الوثيقة */}
        <DocumentTypeSelector />

        {/* صندوق رفع الملفات (File Upload Zone) */}
        <div className="mt-5 mb-6">
          <label className="border-2 border-dashed border-gray-200 hover:border-[#008bf1] bg-slate-50/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all group">
            <input type="file" className="hidden" accept=".jpg,.png,.pdf" />

            <div className="w-11 h-11 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-slate-400 group-hover:text-[#008bf1] transition-all mb-3">
              <UploadCloud className="w-5 h-5 stroke-[2]" />
            </div>

            <p className="text-xs font-bold text-slate-800 group-hover:text-[#008bf1] transition-all">
              اضغط هنا لتحميل الملف
            </p>
            <p className="text-[10px] text-gray-400 mt-1 font-medium font-sans">
              ( JPG, PNG, PDF بحد أقصى 5 ميجابايت )
            </p>
          </label>
        </div>

        {/* زر الإرسال النهائي الملون كالتصميم */}
        <button
          type="button"
          className="w-full bg-[#008bf1] text-white py-3.5 rounded-xl font-bold text-xs hover:bg-[#007cd7] transition-all shadow-sm shadow-blue-500/10"
        >
          إرسال الوثائق للمراجعة
        </button>
      </main>
      {/* حشوة سفلية لتوفير مساحة راحة بصرية ممتازة على أجهزة الموبايل */}
      <div className="pb-4"></div>
    </div>
  );
}
