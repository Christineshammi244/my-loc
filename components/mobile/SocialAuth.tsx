"use client";

import React from "react";
import { Facebook } from "lucide-react";
import { useClerk } from "@clerk/nextjs";

export const SocialAuth: React.FC = () => {
  const clerk = useClerk();

  const handleOAuthSignIn = async (provider: "oauth_google" | "oauth_facebook") => {
    try {
      // إجبار التايب سكريبت على تخطي فحص هذا السطر لمنع تعليق VS Code
      // @ts-ignore
      await clerk.signIn?.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/m/sso-callback",
        redirectUrlComplete: "/m",
      });
    } catch (err) {
      console.error("خطأ في تسجيل الدخول الاجتماعي:", err);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* فاصل "أو عبر" للمصادقة الخارجية */}
      <div className="relative flex items-center justify-center my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-100"></div>
        </div>
        <span className="relative z-10 bg-white px-3 text-[10px] font-bold text-gray-400">
          أو عبر
        </span>
      </div>

      {/* أزرار تسجيل الدخول الاجتماعي */}
      <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto w-full">
        
        {/* زر المصادقة: Google */}
        <button 
          type="button"
          onClick={() => handleOAuthSignIn("oauth_google")}
          className="flex items-center justify-center gap-2 border border-gray-100 rounded-xl py-2 px-4 text-xs font-bold text-slate-700 bg-slate-50/50 hover:bg-slate-50 transition-all cursor-pointer"
        >
          <img
            src="https://svgrepo.com"
            alt="Google"
            className="w-4 h-4"
          />
          <span className="font-sans text-[11px]">Google</span>
        </button>

        {/* زر المصادقة: Facebook */}
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
  );
};