"use client";

import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useSignIn } from "@clerk/nextjs"; 
import { useRouter } from "next/navigation";

export const LoginForm: React.FC = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    setLoading(true);
    setError("");

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/m"); 
      } else {
        console.log(result);
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "خطأ في البريد الإلكتروني أو كلمة المرور");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full space-y-5" dir="rtl">
        
        {error && (
          <div className="p-3.5 text-xs bg-red-50 text-red-500 rounded-xl font-bold text-center border border-red-100 animate-pulse">
            {error}
          </div>
        )}

        <div className="space-y-2 text-right">
          <label className="text-sm font-bold text-gray-700">
            البريد الإلكتروني أو رقم الهاتف
          </label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="example@mail.com"
              className="w-full p-4 pr-12 border rounded-xl bg-gray-50 outline-none focus:ring-1 focus:ring-[#1286c8]"
            />
            <Mail
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={20}
            />
          </div>
        </div>

        <div className="space-y-2 text-right">
          <div className="flex justify-between items-center">
            <label className="text-sm font-bold text-gray-700">
              كلمة المرور
            </label>

            <Link
              href="/m/forgot-password"
              className="text-xs text-[#0984E3] hover:underline font-semibold"
            >
              نسيت كلمة المرور؟
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="********"
              className="w-full p-4 pr-12 border rounded-xl bg-gray-50 outline-none focus:ring-1 focus:ring-[#0984E3]"
            />
            <Lock
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={20}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
        type ="submit"
          disabled={loading}
          className="w-full bg-[#0984E3] text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-[#0873c4] transition-all disabled:opacity-60"
        >
          {loading ? "جاري الدخول..." : "دخول"}
        </button>
      </form>
    </>
);
};