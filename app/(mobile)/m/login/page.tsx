import React from "react";
import { UserPlus } from "lucide-react";
import { LoginForm } from "@/components/mobile/LoginForm";
import { SocialAuth } from "@/components/mobile/SocialAuth";
import Header from "@/components/mobile/Header"; // استخدمي الهيدر الموجود عندك
import Footer from "@/components/mobile/Footer"; // استخدمي الفوتر الموجود عندك
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-white" dir="rtl">
        <Header />

        <main className="flex-grow flex flex-col items-center px-6 py-12 max-w-md mx-auto w-full">
          {/* أيقونة المستخدم */}
          <div className="bg-blue-50 p-6 rounded-3xl mb-6 shadow-sm">
            <UserPlus className="text-[#1286c8]" size={42} />
          </div>

          <h1 className="text-3xl font-black text-gray-900 mb-3">
            تسجيل الدخول
          </h1>
          <p className="text-gray-400 text-sm mb-10 text-center leading-relaxed">
            قم بتسجيل الدخول لمتابعة البحث عن منزلك المثالي في أرقى أحياء سوريا
          </p>

          {/* الكومبونانت التي صنعناها */}
          <LoginForm />
          <SocialAuth />

          <p className="mt-8 text-center text-sm text-gray-500 font-medium">
            ليس لديك حساب؟{" "}
            <Link
              href="/m/create-account"
              className="text-[#1f9be2] font-bold cursor-pointer hover:underline"
            >
              أنشئ حساباً الآن
            </Link>
          </p>
        </main>

        <Footer isHome={false} />
      </div>
    </>
  );
}
