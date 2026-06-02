import React from "react";
import { Settings, Upload } from "lucide-react";

export default function SystemConfig() {
  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm text-right"
      dir="rtl"
    >
      {/* الرأس: العنوان وزر الحفظ */}
      <div className="flex items-center justify-between border-b border-gray-50 pb-4 mb-6">
        <div className="flex items-center gap-2 text-[#008bf1]">
          <Settings className="w-5 h-5" />
          <h2 className="text-md font-black text-gray-800">
            تكوين النظام الأساسي
          </h2>
        </div>
        <button className="bg-[#008bf1] text-white px-5 py-2 rounded-xl font-bold text-xs hover:bg-[#007cd7] transition-all shadow-sm">
          حفظ التغييرات
        </button>
      </div>

      {/* الحقول المدخلة */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-500">اسم المنصة</label>
          <input
            type="text"
            defaultValue="عقارك سوريا"
            className="border border-gray-100 bg-slate-50/50 rounded-xl px-4 py-3 text-xs text-gray-700 font-medium focus:outline-none focus:border-sky-400 transition-all text-right"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-500">
            بريد التواصل الرسمي
          </label>
          <input
            type="email"
            defaultValue="admin@aqarak-syria.com"
            className="border border-gray-100 bg-slate-50/50 rounded-xl px-4 py-3 text-xs text-gray-700 font-medium focus:outline-none focus:border-sky-400 transition-all text-right"
            dir="ltr"
          />
        </div>
      </div>

      {/* منطقة رفع الشعار */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-gray-500">
          شعار المنصة (Logo)
        </label>
        <div className="border-2 border-dashed border-sky-100 rounded-2xl p-6 flex items-center justify-between bg-sky-50/10 hover:bg-sky-50/20 transition-all cursor-pointer">
          <div className="flex items-center gap-3 text-right">
            <div>
              <p className="text-xs font-bold text-gray-700">
                اسحب الشعار هنا أو اضغط للرفع
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">
                بمقاس 512x512 PNG, JPG, SVG كحد أقصى
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl text-gray-400">
              <Upload className="w-5 h-5" />
            </div>
          </div>
          <button className="bg-white border border-gray-100 text-gray-700 px-4 py-2 rounded-xl font-bold text-xs shadow-sm hover:bg-gray-50 transition-all">
            اختيار الملف
          </button>
        </div>
      </div>
    </div>
  );
}
