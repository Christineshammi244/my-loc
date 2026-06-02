"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/mobile/Footer";
import {
  ArrowRight,
  Home,
  User,
  Mail,
  Phone,
  Lock,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import UserTypeSelection from "@/components/mobile/UserTypeSelection";

export default function RegisterPage() {
  return (
    <div
      className="min-h-screen bg-white flex flex-col justify-between font-sans antialiased selection:bg-sky-100"
      dir="rtl"
    >
      <div className="bg-white w-full max-w-md mx-auto px-6 py-4 flex items-center justify-start gap-3">
        <button className="bg-slate-100 text-slate-700 p-2 rounded-full hover:bg-slate-200 transition-all flex items-center justify-center">
          <ArrowRight className="w-4 h-4" />
        </button>
        <h1 className="text-sm font-black text-slate-800 tracking-tight">
          إنشاء حساب جديد
        </h1>
      </div>

      {/* 1. القسم العلوي: الصورة الإرشادية وزر العودة */}
      <div className="w-full max-w-md mx-auto relative aspect-[16/10] overflow-hidden bg-slate-100 group">
        {/* الصورة الرئيسية للعقار الريفي */}
        <div className="w-full h-full relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
          {/* يمكنك استبدال الرابط بمسار الصورة المحلي في مشروعك لاحقاً */}
          <img
            src="https://images.unsplash.com/photo-1549576490-b0b4831ef60a?q=80&w=600&auto=format&fit=crop"
            alt="عقارك"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* وسم شعار المنصة العائم أسفل يسار الصورة */}
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5   px-3 py-1.5 rounded-xl   shadow-sm text-[#008bf1] font-black text-xs">
          <div className="bg-[#008bf1] text-white p-1.5 rounded-md">
            <Home className="w-5 h-5" />
          </div>
          <span className="text-white text-sm">عقارك</span>
        </div>
      </div>

      {/* 2. محتوى الإدخال والاستمارة (Form Section) */}
      <main className="flex-1 max-w-md mx-auto w-full px-6 py-6 flex flex-col justify-center">
        {/* نصوص الترحيب الافتتاحية */}
        <div className="text-right mb-6">
          <h1 className="text-xl font-black text-slate-800 tracking-tight">
            أهلاً بك في منصتنا
          </h1>
          <p className="text-xs text-gray-400 mt-1 font-medium">
            ابدأ رحلتك العقارية اليوم في "عقارك" بكل سهولة وأمان
          </p>
        </div>

        {/* استمارة بيانات المستخدم */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* حقل: الاسم الكامل */}
          <div className="space-y-1 text-right">
            <label className="text-xs font-bold text-slate-700 block">
              الاسم الكامل
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="أدخل اسمك بالكامل"
                className="w-full bg-slate-50 border border-gray-100 rounded-xl px-8 py-3 text-xs font-medium text-slate-800 placeholder-gray-400 focus:outline-none focus:border-[#008bf1] focus:bg-white transition-all text-right"
              />
            </div>
          </div>

          {/* حقل: البريد الإلكتروني */}
          <div className="space-y-1 text-right">
            <label className="text-xs font-bold text-slate-700 block">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                placeholder="example@mail.com"
                className="w-full bg-slate-50 border border-gray-100 rounded-xl px-8 py-3 text-xs font-mono text-right placeholder-gray-400 focus:outline-none focus:border-[#008bf1] focus:bg-white transition-all"
              />
            </div>
          </div>
          {/* حقل: رقم الهاتف مع مقدمة الدولة المدمجة بالتصميم */}
          <div className="space-y-1 text-right">
            <label className="text-xs font-bold text-slate-700 block">
              رقم الهاتف
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                <Phone className="w-4 h-4" />
              </span>
              <input
                type="tel"
                placeholder="+963 9xx xxx xxx"
                className="w-full bg-slate-50 border border-gray-100 rounded-xl px-8 py-3 text-xs font-mono text-right placeholder-gray-400 focus:outline-none focus:border-[#008bf1] focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* حقل: كلمة المرور */}
          <div className="space-y-1 text-right">
            <label className="text-xs font-bold text-slate-700 block">
              كلمة المرور
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-gray-100 rounded-xl px-8 py-3 text-xs font-mono text-right placeholder-gray-400 focus:outline-none focus:border-[#008bf1] focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* استدعاء مكون اختيار نوع الحساب التفاعلي المستقل */}
          <UserTypeSelection />

          {/* زر التقديم النهائي: إنشاء حساب */}
          <button
            type="submit"
            className="w-full bg-[#008bf1] text-white py-3 rounded-xl font-bold text-xs hover:bg-[#007cd7] transition-all shadow-sm shadow-blue-500/10 mt-2"
          >
            إنشاء حساب
          </button>
        </form>

        {/* نص الانتقال لتسجيل الدخول للحسابات الحالية */}
        <div className="text-center mt-5 text-[11px] font-bold text-gray-400">
          <span>لديك حساب بالفعل؟ </span>
          <Link href="/m/login" className="text-[#008bf1] hover:underline">
            تسجيل الدخول
          </Link>
        </div>

        {/* فاصل "أو عبر" للمصادقة الخارجية */}
        <div className="relative flex items-center justify-center my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <span className="relative z-10 bg-white px-3 text-[10px] font-bold text-gray-400">
            أو عبر
          </span>
        </div>

        {/* أزرار تسجيل الدخول الاجتماعي بملصقات وشعارات دقيقة */}
        <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto w-full">
          {/* زر المصادقة: Google */}
          <button className="flex items-center justify-center gap-2 border border-gray-100 rounded-xl py-2 px-4 text-xs font-bold text-slate-700 bg-slate-50/50 hover:bg-slate-50 transition-all">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-4 h-4"
            />
            <span className="font-sans text-[11px]">Google</span>
          </button>

          {/* زر المصادقة: Facebook */}
          <button className="flex items-center justify-center gap-2 border border-gray-100 rounded-xl py-2 px-4 text-xs font-bold text-slate-700 bg-slate-50/50 hover:bg-slate-50 transition-all">
            <Facebook className="w-4 h-4 text-[#1877F2] fill-[#1877F2]" />
            <span className="font-sans text-[11px]">Facebook</span>
          </button>
        </div>
      </main>

      {/* 3. الفوتر السفلي المتناسق للمنصة */}
      <Footer isHome={false} />
    </div>
  );
}
