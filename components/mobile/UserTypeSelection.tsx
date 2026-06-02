"use client";
import React, { useState } from "react";

export default function UserTypeSelection() {
  // الحالة الافتراضية محددة على "مشتري" كما في الصورة
  const [selectedType, setSelectedType] = useState<"buyer" | "seller" | "both">(
    "buyer",
  );

  return (
    <div className="space-y-2 text-right">
      <label className="text-xs font-bold text-slate-700 block mb-1">
        نوع المستخدم
      </label>
      <div className="grid grid-cols-3 gap-2">
        {/* خيار: كلاهما */}
        <button
          type="button"
          onClick={() => setSelectedType("both")}
          className={`py-2.5 rounded-xl font-bold text-xs border transition-all text-center ${
            selectedType === "both"
              ? "bg-sky-50 border-[#008bf1] text-[#008bf1] shadow-sm"
              : "bg-slate-50 border-gray-100 text-slate-600 hover:bg-slate-100"
          }`}
        >
          كلاهما
        </button>

        {/* خيار: بائع */}
        <button
          type="button"
          onClick={() => setSelectedType("seller")}
          className={`py-2.5 rounded-xl font-bold text-xs border transition-all text-center ${
            selectedType === "seller"
              ? "bg-sky-50 border-[#008bf1] text-[#008bf1] shadow-sm"
              : "bg-slate-50 border-gray-100 text-slate-600 hover:bg-slate-100"
          }`}
        >
          بائع
        </button>

        {/* خيار: مشتري */}
        <button
          type="button"
          onClick={() => setSelectedType("buyer")}
          className={`py-2.5 rounded-xl font-bold text-xs border transition-all text-center ${
            selectedType === "buyer"
              ? "bg-sky-50 border-[#008bf1] text-[#008bf1] shadow-sm"
              : "bg-slate-50 border-gray-100 text-slate-600 hover:bg-slate-100"
          }`}
        >
          مشتري
        </button>
      </div>
    </div>
  );
}
