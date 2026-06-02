// src/components/admin/UserForm.tsx
"use client";
import React, { useState } from "react";
import { User, Mail, Tag, ShoppingCart, Layers } from "lucide-react";

export default function UserForm() {
  const [userType, setUserType] = useState("both"); // "كلاهما" محدد افتراضياً حسب اللون في الصورة الجديدة

  return (
    <div
      className="bg-white rounded-2xl border border-gray-100/80 p-10 shadow-sm text-center max-w-4xl mx-auto mt-6"
      dir="rtl"
    >
      {/* العناوين الحرفية */}
      <h2 className="text-3xl text-right font-extrabold text-[#1e293b] mb-2 tracking-tight">
        إنشاء سجل مستخدم جديد
      </h2>
      <p className="text-sm text-right text-gray-400 font-medium mb-10">
        أدخل تفاصيل المستخدم لإضافته إلى منصة عقارك سوريا
      </p>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="space-y-8 text-right"
      >
        {/* الحقول النصية */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* حقل الاسم */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-600 block pr-1">
              اسم المستخدم الكامل
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 right-0 flex items-center pr-3.5">
                <User className="h-4 w-4 text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="أدخل الاسم الثلاثي"
                className="w-full pr-10 pl-4 py-3 bg-[#f8fafc] border border-gray-100 rounded-xl focus:outline-none focus:border-[#008bf1] focus:bg-white transition-all text-sm text-right font-medium text-gray-700"
              />
            </div>
          </div>

          {/* حقل البريد */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-600 block pr-1">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 right-0 flex items-center pl-3.5 order-last md:order-none">
                <Mail className="h-4 w-4 text-gray-400" />
              </span>
              <input
                type="email"
                placeholder="example@domain.com"
                className="w-full pl-6 pr-4 py-3 bg-[#f8fafc] border border-gray-100 rounded-xl focus:outline-none focus:border-[#008bf1] focus:bg-white transition-all text-sm text-right font-medium text-gray-700"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        {/* اختيار نوع المستخدم الثلاثي */}
        <div className="space-y-2.5">
          <label className="text-xs font-bold text-gray-600 block pr-1">
            نوع المستخدم
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setUserType("seller")}
              className={`flex items-center justify-center gap-2.5 py-3.5 rounded-xl border text-sm font-bold transition-all ${
                userType === "seller"
                  ? "border-[#008bf1] bg-[#e5f3fe] text-[#008bf1]"
                  : "border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}
            >
              <Tag className="w-4 h-4" />
              <span>بائع عقارات</span>
            </button>

            <button
              type="button"
              onClick={() => setUserType("buyer")}
              className={`flex items-center justify-center gap-2.5 py-3.5 rounded-xl border text-sm font-bold transition-all ${
                userType === "buyer"
                  ? "border-[#008bf1] bg-[#e5f3fe] text-[#008bf1]"
                  : "border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>مشتري</span>
            </button>

            <button
              type="button"
              onClick={() => setUserType("both")}
              className={`flex items-center justify-center gap-2.5 py-3.5 rounded-xl border text-sm font-bold transition-all ${
                userType === "both"
                  ? "border-[#008bf1] bg-[#e5f3fe] text-[#008bf1]"
                  : "border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>كلاهما</span>
            </button>
          </div>
        </div>

        {/* زر الإرسال الملون */}
        <div className="flex justify-center pt-2">
          <button
            type="submit"
            className="w-full sm:w-52 py-3.5 bg-[#008bf1] text-white font-bold rounded-xl hover:bg-[#007cd7] transition-all text-sm shadow-md shadow-blue-100"
          >
            إنشاء سجل جديد
          </button>
        </div>
      </form>
    </div>
  );
}
