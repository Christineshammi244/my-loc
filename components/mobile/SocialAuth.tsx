import React from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Facebook } from "lucide-react";
export const SocialAuth: React.FC = () => {
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
    </div>
  );
};
