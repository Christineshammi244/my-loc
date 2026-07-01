"use client";

import React, { useState } from "react";
import { ArrowRight, ShieldCheck, Info, UploadCloud, User, Facebook, KeyRound } from "lucide-react";
import DocumentTypeSelector from "@/components/mobile/DocumentTypeSelector";
import Footer from "@/components/mobile/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useClerk, useSignUp } from "@clerk/nextjs";

export default function VerificationPage() {
  const router = useRouter();
  const { signUp} = useSignUp();
  const { setActive } = useClerk();
  const [loading, setLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isClerkVerified, setIsClerkVerified] = useState(false);

  const isLoaded = signUp !== undefined;

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !signUp || !setActive) return;

    setLoading(true);
    try {
      const signUpAttempt = signUp as any;
      const completeSignUp = await signUpAttempt.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        setIsClerkVerified(true);
        alert("تم التحقق من بريدك الإلكتروني بنجاح! يمكنك الآن رفع وثائق التوثيق.");
      } else {
        alert("لم يتم اكتمال الحساب، يرجى مراجعة الدعم الفني.");
      }
    } catch (error: any) {
      console.error(error);
      alert(error.errors?.[0]?.message || "رمز التحقق غير صحيح، يرجى المحاولة مرة أخرى");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadDocuments = async () => {
    setLoading(true);
    try {
      alert("تم إرسال وثائقك بنجاح! حسابك قيد المراجعة حالياً.");
      router.push("/m/home");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-white flex flex-col justify-between font-sans antialiased selection:bg-sky-100"
      dir="rtl"
    >
      <header className="bg-white border-b border-gray-50/80 px-6 py-4 flex items-center justify-between max-w-md mx-auto w-full">
        <Link
          href="/m/create-account"
          className="p-2 rounded-full hover:bg-slate-50 text-slate-700 transition-all"
        >
          <ArrowRight className="w-5 h-5" />
        </Link>

        <h1 className="text-sm font-black text-slate-800 tracking-tight">
          توثيق الحساب
        </h1>

        <Link
          href="/m/profile"
          className="p-2 rounded-full bg-sky-50 text-[#008bf1] border border-sky-100/30"
        >
          <User className="w-4 h-4" />
        </Link>
      </header>

      <main className="flex-1 max-w-md mx-auto w-full px-6 py-6 flex flex-col justify-start">
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 bg-blue-50 text-[#008bf1] rounded-full flex items-center justify-center shadow-inner">
            <ShieldCheck className="w-8 h-8 stroke-[1.8]" />
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-lg font-black text-slate-800 tracking-tight">
            تحقق من الهوية
          </h2>
          <p className="text-xs text-gray-400 mt-1.5 font-medium leading-relaxed max-w-xs mx-auto">
            يرجى تحميل الوثائق المطلوبة لإتمام عملية التحقق من حسابك في{" "}
            <span className="text-[#008bf1] font-bold">عقارك سوريا</span>
          </p>
        </div>

        {!isClerkVerified ? (
          <form className="space-y-4 mb-6" onSubmit={handleVerifyOTP}>
            <div className="space-y-1 text-right">
              <label className="text-xs font-bold text-slate-700 block">
                أدخل رمز التحقق (OTP) المرسل إلى بريدك
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                  <KeyRound className="w-4 h-4" />
                </span>
                <input
                  type="text"placeholder="000000"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-100 rounded-xl px-8 py-3 text-xs font-mono text-center tracking-widest placeholder-gray-400 focus:outline-none focus:border-[#008bf1] focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#008bf1] text-white py-3.5 rounded-xl font-bold text-xs hover:bg-[#007cd7] transition-all shadow-sm"
            >
              {loading ? "جاري التحقق من الرمز..." : "تأكيد رمز البريد"}
            </button>
          </form>
        ) : (
          <>
            <div className="bg-sky-50/50 border border-sky-100 rounded-2xl p-4 mb-6 flex items-start gap-3">
              <Info className="w-4 h-4 text-[#008bf1] shrink-0 mt-0.5" />
              <div className="text-right">
                <p className="text-xs font-bold text-blue-900">حالة الحساب</p>
                <p className="text-[14px] text-blue-700/80 mt-0.5 leading-relaxed font-medium">
                  حسابك قيد المراجعة حالياً من قبل الإدارة. يرجى الانتظار حتى يتم التحقق من بياناتك.
                </p>
              </div>
            </div>

            <DocumentTypeSelector />

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

            <button
              type="button"
              disabled={loading}
              onClick={handleUploadDocuments}
              className="w-full bg-[#008bf1] text-white py-3.5 rounded-xl font-bold text-xs hover:bg-[#007cd7] transition-all shadow-sm shadow-blue-500/10"
            >
              {loading ? "جاري الإرسال..." : "إرسال الوثائق للمراجعة"}
            </button>
          </>
        )}

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
            <img src="https://svgrepo.com" alt="Google" className="w-4 h-4" />
            <span className="font-sans text-[11px]">Google</span>
          </button>

          <button type="button" className="flex items-center justify-center gap-2 border border-gray-100 rounded-xl py-2 px-4 text-xs font-bold text-slate-700 bg-slate-50/50 hover:bg-slate-50 transition-all">
            <Facebook className="w-4 h-4 text-[#1877F2] fill-[#1877F2]" />
            <span className="font-sans text-[11px]">Facebook</span>
          </button>
        </div>
      </main><div className="pb-4"></div>
      <Footer isHome={false} />
    </div>
  );
}