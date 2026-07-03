"use client";

import React, { useState } from "react";
import { UserPlus, Mail, Lock, Eye, EyeOff, Facebook } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Footer from "@/components/mobile/Footer";
import Header from "@/components/mobile/Header";
import {loginUserAction} from "@/app/actions/userActions";
import{useClerk ,useSignIn} from "@clerk/nextjs";
export default function LoginPage() {
  const clerk = useClerk();
  const isReady=!!clerk;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(""); // لتخزين وعرض الخطأ الأحمر على الشاشة
const[showPassword, setShowPassword] = useState(false);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(""); // تصفير الخطأ عند كل محاولة جديدة

    try {
      const dataToSend = new FormData();
      dataToSend.append("email", email);
      dataToSend.append("password", password);

      const response = await loginUserAction(dataToSend);

      if (response && response.success) {
        alert("مرحباً بك! تم تسجيل الدخول بنجاح.");
        // التوجيه التلقائي للأدمن أو الصفحة الرئيسية حسب صلاحية الحساب
        if (response.user?.role === "admin" || response.user?.role === "ADMIN") {
          window.location.href = "/admin/transactions";
          
        } else {
          router.push("/");
        }
      } else {
        // عرض الخطأ الأحمر القادم من السيرفر على الشاشة
        setErrorMsg(response?.error || "خطأ في البريد الإلكتروني أو كلمة المرور");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("حدث خطأ في الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  };
  // دالة تسجيل الدخول الاجتماعي
  const handleOAuthSignIn = async (provider: "oauth_google" | "oauth_facebook") => {
    if(!isReady)return;
    try {
      
      // @ts-ignore
      await clerk.signIn?.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/m",
        redirectUrlComplete:"/m",
        continueSignUp:true,
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-white" dir="rtl">
      <Header/>

      <main className="flex-grow flex flex-col items-center px-6 py-12 max-w-md mx-auto w-full">
        {/* أيقونة المستخدم */}
        <div className="bg-blue-50 p-6 rounded-3xl mb-6 shadow-sm">
          <UserPlus className="text-[#1286c8]" size={42} />
        </div>

        <h1 className="text-3xl font-black text-gray-900 mb-3">تسجيل الدخول</h1>
        <p className="text-gray-400 text-sm mb-10 text-center leading-relaxed">
          قم بتسجيل الدخول لمتابعة البحث عن منزلك المثالي في أرقى أحياء سوريا
        </p>

        {/* نموذج تسجيل الدخول المباشر */}
        <form onSubmit={handleLogin} className="w-full space-y-5">
          {errorMsg && (
            <div className="p-3.5 text-xs bg-red-50 text-red-500 rounded-xl font-bold text-center border border-red-100">
              {errorMsg}
            </div>
          )}

          {/* حقل البريد */}
          <div className="space-y-2 text-right">
            <label className="text-sm font-bold text-gray-700">البريد الإلكتروني أو رقم الهاتف</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="example@mail.com"
                className="w-full p-4 pr-12 border rounded-xl bg-gray-50 outline-none focus:ring-1 focus:ring-[#1286c8]"
              />
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            </div>
          </div>
          {/* حقل كلمة المرور */}
          <div className="space-y-2 text-right">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-gray-700">كلمة المرور</label>
              <Link href="/m/forgot-password" className="text-xs text-[#0984E3] hover:underline font-semibold">
                نسيت كلمة المرور؟
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full p-4 pr-12 border rounded-xl bg-gray-50 outline-none focus:ring-1 focus:ring-[#0984E3]"
              />
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* زر الدخول */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0984E3] text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-[#0873c4] transition-all disabled:opacity-60 cursor-pointer"
          >
            {loading ? "جاري الدخول..." : "دخول"}
          </button>
        </form>

        {/* أزرار التواصل الاجتماعي */}
        <div className="w-full space-y-4">
          <div className="relative flex items-center justify-center my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <span className="relative z-10 bg-white px-3 text-[10px] font-bold text-gray-400">أو عبر</span>
          </div>

          <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto w-full">
            <button
              type="button"
              onClick={() => handleOAuthSignIn("oauth_google")}
              disabled={!isReady}
              className="flex items-center justify-center gap-2 border border-gray-100 rounded-xl py-2 px-4 text-xs font-bold text-slate-700 bg-slate-50/50 hover:bg-slate-50 transition-all cursor-pointer"
            >
              <img src="https://svgrepo.com" alt="Google" className="w-4 h-4" />
              <span className="font-sans text-[11px]">Google</span>
            </button>

            <button
              type="button"
              onClick={() => handleOAuthSignIn("oauth_facebook")}
              className="flex items-center justify-center gap-2 border border-gray-100 rounded-xl py-2 px-4 text-xs font-bold text-slate-700 bg-slate-50/50 hover:bg-slate-50 transition-all cursor-pointer"
            >
              <Facebook className="w-4 h-4 text-[#1877F2] fill-[#1877F2]" />
              <span className="font-sans text-[11px]">Facebook</span>
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500 font-medium">
          ليس لديك حساب؟{" "}
          <Link href="/m/create-account" className="text-[#1f9be2] font-bold cursor-pointer hover:underline">
            أنشئ حساباً الآن
          </Link>
        </p>
      </main>

      <Footer isHome={false} />
    </div>
  );
}