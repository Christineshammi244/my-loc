"use client";
import React, { useState } from "react";

export default function DocumentTypeSelector() {
  // النوع الافتراضي: بطاقة الهوية الشخصية كما في التصميم
  const [selectedDoc, setSelectedDoc] = useState<
    "id" | "passport" | "property"
  >("id");

  return (
    <div className="space-y-3 text-right">
      <h3 className="text-m font-black text-slate-800 border-r-2 border-amber-500 pr-2">
        الوثائق المطلوبة
      </h3>

      <div className="space-y-2.5">
        {/* الخيار الأول: بطاقة الهوية الشخصية */}
        <label
          onClick={() => setSelectedDoc("id")}
          className={`flex items-center justify-end gap-3 flex-row-reverse p-4 rounded-xl border transition-all cursor-pointer ${
            selectedDoc === "id"
              ? "border-[#008bf1] bg-sky-50/30"
              : "border-gray-100 bg-white hover:bg-slate-50"
          }`}
        >
          <div className="flex-1 pr-1">
            <p className="text-s font-bold text-slate-800">
              بطاقة الهوية الشخصية
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5 font-medium">
              صورة واضحة للوجهين الأمامي والخلفي
            </p>
          </div>
          <div
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              selectedDoc === "id" ? "border-[#008bf1]" : "border-gray-300"
            }`}
          >
            {selectedDoc === "id" && (
              <div className="w-2 h-2 bg-[#008bf1] rounded-full"></div>
            )}
          </div>
        </label>

        {/* الخيار الثاني: جواز السفر */}
        <label
          onClick={() => setSelectedDoc("passport")}
          className={`flex items-center justify-end gap-3 flex-row-reverse p-4 rounded-xl border transition-all cursor-pointer ${
            selectedDoc === "passport"
              ? "border-[#008bf1] bg-sky-50/30"
              : "border-gray-100 bg-white hover:bg-slate-50"
          }`}
        >
          <div className="flex-1 pr-1">
            <p className="text-s font-bold text-slate-800">جواز السفر</p>
            <p className="text-[10px] text-gray-400 mt-0.5 font-medium">
              نسخة سارية المفعول من الصفحة الأولى
            </p>
          </div>
          <div
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              selectedDoc === "passport"
                ? "border-[#008bf1]"
                : "border-gray-300"
            }`}
          >
            {selectedDoc === "passport" && (
              <div className="w-2 h-2 bg-[#008bf1] rounded-full"></div>
            )}
          </div>
        </label>

        {/* الخيار الثالث: سند ملكية العقار */}
        <label
          onClick={() => setSelectedDoc("property")}
          className={`flex items-center justify-end-3 gap-3 flex-row-reverse p-4 rounded-xl border transition-all cursor-pointer ${
            selectedDoc === "property"
              ? "border-[#008bf1] bg-sky-50/30"
              : "border-gray-100 bg-white hover:bg-slate-50"
          }`}
        >
          <div className="flex-1 pr-1">
            <p className="text-s font-bold text-slate-800">سند ملكية العقار</p>
            <p className="text-[10px] text-gray-400 mt-0.5 font-medium">
              وثيقة رسمية تثبت ملكية العقار المعلن عنه
            </p>
          </div>
          <div
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              selectedDoc === "property"
                ? "border-[#008bf1]"
                : "border-gray-300"
            }`}
          >
            {selectedDoc === "property" && (
              <div className="w-2 h-2 bg-[#008bf1] rounded-full"></div>
            )}
          </div>
        </label>
      </div>
    </div>
  );
}
