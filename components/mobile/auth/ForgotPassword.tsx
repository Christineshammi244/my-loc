"use client";

import React, { useState } from "react";
import { ArrowRight, Mail, Home, RotateCcw, Lock } from "lucide-react";
import Link from "next/link";

export default function ForgotPassword() {
  const [emailOrPhone, setEmailOrPhone] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // هنا سيتم ربط الكود مع الباكند لاحقاً لإرسال الرمز
    console.log("إرسال الكود إلى:", emailOrPhone);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#e3f2fd]/30 via-white to-[#e3f2fd]/20 p-4 font-sans"
      dir="rtl"
    >
      {/* الحاوية الرئيسية للشاشة المحاكية لتصميم الموبايل المنحني */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-[40px] shadow-xl border border-gray-100 p-8 relative overflow-hidden flex flex-col items-center">
        {/* الهيدر العلوي: زر الرجوع وشعار عقارك */}
        <div className="w-full flex items-center justify-between mb-12">
          {/* زر الرجوع (سهم لليسار لأن الاتجاه عربي RTL) */}
          <Link
            href="/m/login"
            className="p-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-full transition-all duration-200"
            aria-label="رجوع"
          >
            <ArrowRight className="w-5 h-5" />
          </Link>

          {/* شعار عقارك */}
          <Link href="/" className="flex items-center gap-2">
            <div className="p-2 bg-[#1286c8] text-white shadow-md rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 " size={28} />
            </div>
            <span className="text-2xl font-bold text-[#1286c8]">عقارك</span>
          </Link>

          {/* مساحة فارغة للموازنة البصرية مقابل زر الرجوع */}
          <div className="w-10"></div>
        </div>

        {/* أيقونة إعادة التعيين المركزية المحاطة بدائرة خلفية زرقاء خفيفة */}
        <div className="w-20 h-20 bg-[#e3f2fd] rounded-full flex items-center justify-center mb-8 relative">
          {/* السهم الدائري الخارجي */}
          <RotateCcw className="w-12 h-12 text-[#1a73e8] stroke-1.3 items-center justify-center" />

          {/* القفل الصغير في المنتصف تماماً مثل الصورة */}
          <div className="absolute inset-0 flex items-center justify-center mt-1">
            <Lock className="w-4 h-4 text-[#1a73e8] " />
          </div>
        </div>

        {/* النصوص التوضيحية */}
        <h1 className="text-3xl font-extrabold text-[#111827] text-center mb-4">
          نسيت كلمة المرور؟
        </h1>
        <p className="text-gray-500 text-center text-base leading-relaxed max-w-[320px] mb-10">
          لا تقلق، أدخل بريدك الإلكتروني أو رقم الهاتف المرتبط بحسابك وسنرسل لك
          رمزاً لإعادة تعيين كلمة المرور.
        </p>

        {/* نموذج الإدخال */}
        <form
          onSubmit={handleSubmit}
          className="w-full flex-1 flex flex-col justify-between"
        >
          <div className="mb-8">
            <label className="block text-right text-gray-800 font-semibold mb-3 mr-2 text-sm">
              البريد الإلكتروني أو رقم الهاتف
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="example@mail.com"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                className="w-full text-right p-4 pr-12 pl-12 border border-gray-200 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-[#1a73e8] focus:border-transparent placeholder-gray-300 text-gray-700 font-medium transition-all duration-200 shadow-sm"
                required
                dir="ltr" // لجعل المدخلات والـ placeholder تبدأ من اليسار كما في الصورة
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* زر إرسال الكود الأزرق */}
          <button
            type="submit"
            className="w-full bg-[#10a3eb] hover:bg-[#0f92d4] text-white font-bold py-4 rounded-2xl shadow-lg shadow-[#10a3eb]/20 active:scale-[0.98] transition-all duration-200 text-lg"
          >
            إرسال الكود
          </button>
        </form>
        {/* خط محاكي لـ Home Indicator الخاص بنظام iOS في أسفل الشاشة الموبايل كجمالية للتصميم */}
        <div className="w-32 h-1.5 bg-gray-200 rounded-full mt-12 mb-1"></div>
      </div>
    </div>
  );
}
