"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/mobile/Footer";
import { createUserAdminAction } from "@/app/actions/userActions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
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
  const router = useRouter();
  const { signUp } = useSignUp();
  const isLoaded=signUp !== undefined;
  const [loading, setLoading] = useState(false);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("user");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    
    setLoading(true);
   try {
      // 1. إنشاء الحساب المباشر داخل Clerk وتفعيل الجلسة فوراً دون انتظار كود
      await signUp.create({
        emailAddress: email,
        password: password,
        firstName: name,
      });

      // 2. صياغة البيانات وحفظها في قاعدة بيانات مشروعك
      const dataToSend = new FormData();
      dataToSend.append("name", name);
      dataToSend.append("email", email);
      dataToSend.append("phone", phone);
      dataToSend.append("password", password);
      dataToSend.append("role", role);

      const response = await createUserAdminAction(dataToSend);

      if (response && response.success) {
        // 3. التوجيه المباشر لصفحة التوثيق لرفع الملفات (تخطياً لخطوة الرمز)
        router.push("/m/verification-account"); 
      } else {
        alert(response?.error || "حدث خطأ أثناء إنشاء الحساب في قاعدة البيانات");
      }
    }
    catch (error: any) {
      console.error(error);
      alert(error.errors?.[0]?.message || "حدث خطأ في الاتصال بالخادم، يرجى التأكد من البيانات");
    } finally {
      setLoading(false);
    }
  };

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

      <div className="w-full max-w-md mx-auto relative aspect-[16/10] overflow-hidden bg-slate-100 group">
        <div className="w-full h-full relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
          <img
            src="https://unsplash.com"
            alt="عقارك"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>

        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-xl shadow-sm text-[#008bf1] font-black text-xs">
          <div className="bg-[#008bf1] text-white p-1.5 rounded-md">
            <Home className="w-5 h-5" />
          </div>
          <span className="text-white text-sm">عقارك</span>
        </div>
      </div>

      <main className="flex-1 max-w-md mx-auto w-full px-6 py-6 flex flex-col justify-center">
        <div className="text-right mb-6">
          <h1 className="text-xl font-black text-slate-800 tracking-tight">
            أهلاً بك في منصتنا
          </h1>
          <p className="text-xs text-gray-400 mt-1 font-medium">
            ابدأ رحلتك العقارية اليوم في "عقارك" بكل سهولة وأمان
          </p>
        </div><form className="space-y-4" onSubmit={handleRegister}>
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-gray-100 rounded-xl px-8 py-3 text-xs font-medium text-slate-800 placeholder-gray-400 focus:outline-none focus:border-[#008bf1] focus:bg-white transition-all text-right"
                required
              />
            </div>
          </div>

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-gray-100 rounded-xl px-8 py-3 text-xs font-mono text-right placeholder-gray-400 focus:outline-none focus:border-[#008bf1] focus:bg-white transition-all"
                required
              />
            </div>
          </div>

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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-50 border border-gray-100 rounded-xl px-8 py-3 text-xs font-mono text-right placeholder-gray-400 focus:outline-none focus:border-[#008bf1] focus:bg-white transition-all"
              />
            </div>
          </div>

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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-gray-300 rounded-xl px-8 py-3 text-xs font-mono text-right"
                required
              />
            </div>
          </div>
<div id="clerk-captcha"></div>
          <UserTypeSelection />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#008bf1] text-white py-3 rounded-xl font-bold text-xs hover:bg-[#007cd7] transition-all shadow-sm shadow-blue-500/10 mt-2"
          >
            {loading ? "جاري الإنشاء..." : "إنشاء حساب"}
          </button>
        </form>

        <div className="text-center mt-5 text-[11px] font-bold text-gray-400">
          <span>لديك حساب بالفعل؟ </span>
          <Link href="/m/login" className="text-[#008bf1] hover:underline">
            تسجيل الدخول
          </Link>
        </div>

        <div className="relative flex items-center justify-center my-6">
          <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
          </div>
          <span className="relative z-10 bg-white px-3 text-[10px] font-bold text-gray-400">
            أو عبر
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto w-full">
          <button type="button" className="flex items-center justify-center gap-2 border border-gray-100 rounded-xl py-2 px-4 text-xs font-bold text-slate-700 bg-slate-50/50 hover:bg-slate-50 transition-all">
            <img
              src="https://svgrepo.com"
              alt="Google"
              className="w-4 h-4"
            />
            <span className="font-sans text-[11px]">Google</span>
          </button>

          <button type="button" className="flex items-center justify-center gap-2 border border-gray-100 rounded-xl py-2 px-4 text-xs font-bold text-slate-700 bg-slate-50/50 hover:bg-slate-50 transition-all">
            <Facebook className="w-4 h-4 text-[#1877F2] fill-[#1877F2]" />
            <span className="font-sans text-[11px]">Facebook</span>
          </button>
        </div>
      </main>

      <Footer isHome={false} />
    </div>
  );
}