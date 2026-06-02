// src/components/admin/QuickTransaction.tsx
import React from "react";
import { FilePlus2, Search } from "lucide-react";

export default function QuickTransaction() {
  return (
    <div
      id="quick-transaction"
      className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm text-right mt-6"
      dir="rtl"
    >
      <h3 className="text-md font-bold text-gray-800 flex items-center gap-2 justify-start border-b border-gray-50 pb-4 mb-5">
        <FilePlus2 className="w-5 h-5 text-[#008bf1]" />
        <span>إنشاء سجل معاملة يدوي</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* حقل البحث عن مستخدم */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-500">
            بحث عن مستخدم
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="الاسم أو رقم الهاتف..."
              className="w-full text-xs p-3 pr-10 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:border-[#008bf1] transition-all"
            />
            <Search className="w-4 h-4 text-gray-400 absolute top-3.5 right-3.5" />
          </div>
        </div>

        {/* نوع العقار */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-500">نوع العقار</label>
          <select className="w-full text-xs p-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:border-[#008bf1] transition-all appearance-none">
            <option>شقة سكنية</option>
            <option>أرض تجارية</option>
            <option>مكتب مخدم</option>
          </select>
        </div>

        {/* قيمة المعاملة */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-500">
            قيمة المعاملة (ل.س)
          </label>
          <input
            type="text"
            placeholder="000,000,000"
            className="w-full text-xs p-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:border-[#008bf1] transition-all text-right font-mono"
          />
        </div>
      </div>

      {/* تفاصيل المعاملة */}
      <div className="mt-5 space-y-1.5">
        <label className="text-xs font-bold text-gray-500">
          تفاصيل المعاملة
        </label>
        <textarea
          rows={3}
          placeholder="أدخل تفاصيل إضافية عن عملية البيع أو الإيجار..."
          className="w-full text-xs p-4 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:border-[#008bf1] transition-all resize-none"
        />
      </div>

      {/* أزرار الحفظ */}
      <div className="mt-6 flex items-center justify-start gap-3">
        <button className="bg-[#008bf1] text-white px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-[#007cd7] transition-all shadow-sm">
          حفظ المعاملة
        </button>
        <button className="bg-gray-100 text-gray-500 px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-gray-200 transition-all">
          إلغاء
        </button>
      </div>
    </div>
  );
}
