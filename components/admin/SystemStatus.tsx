import React from "react";

export default function SystemStatus() {
  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm text-right flex flex-col justify-between min-h-[250px]"
      dir="rtl"
    >
      <div>
        <h3 className="text-xs font-black text-gray-800">حالة النظام</h3>
        <div className="flex items-center gap-1.5 justify-start text-emerald-500 font-bold text-[11px] mt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>جميع الخدمات تعمل بكفاءة</span>
        </div>

        <div className="mt-5 space-y-2.5 text-[11px] font-medium text-gray-500">
          <div className="flex items-center justify-between">
            <span>سرعة الاستجابة</span>
            <span className="font-bold text-gray-800">120ms</span>
          </div>
          <div className="flex items-center justify-between">
            <span>الطلبات النشطة</span>
            <span className="font-bold text-gray-800">842</span>
          </div>
          <div className="flex items-center justify-between">
            <span>استهلاك السيرفر</span>
            <span className="font-bold text-gray-800">14%</span>
          </div>
        </div>
      </div>

      <button className="w-full bg-[#008bf1] text-white py-2 rounded-xl font-bold text-xs hover:bg-[#007cd7] transition-all shadow-sm mt-4">
        فتح تفاصيل السيرفر
      </button>
    </div>
  );
}
