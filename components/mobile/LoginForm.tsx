"use client";
import React from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <form className="w-full space-y-5" dir="rtl">
        {/* حقل البريد */}
        <div className="space-y-2 text-right">
          <label className="text-sm font-bold text-gray-700">
            {" "}
            البريد الإلكتروني أو رقم الهاتف
          </label>
          <div className="relative">
            <input
              type="email"
              placeholder="example@mail.com"
              className="w-full p-4 pr-12 border rounded-xl bg-gray-50 outline-none focus:ring-1 focus:ring-[#1286c8]"
            />
            <Mail
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={20}
            />
          </div>
        </div>

        {/* حقل كلمة المرور */}
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
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400
              cursor-pointer"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#0984E3] text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-[#0873c4] transition-all"
        >
          دخول
        </button>
      </form>
    </>
  );
};
