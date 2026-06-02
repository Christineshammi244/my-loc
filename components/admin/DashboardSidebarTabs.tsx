import React from "react";
import { UserCheck, MessageSquare, CornerUpLeft, Trash2 } from "lucide-react";

export default function DashboardSidebarTabs() {
  return (
    <div className="space-y-4 text-right" dir="rtl">
      {/* 1. طلبات توثيق الحساب */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-50 pb-2 mb-3">
          <div className="flex items-center gap-1.5 text-slate-700 font-black text-xs">
            <UserCheck className="w-4 h-4 text-purple-500" />
            <h3>طلبات توثيق الحساب</h3>
          </div>
          <span className="text-[9px] font-black text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded-md">
            12 جديد
          </span>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[11px]">
            <div className="text-right">
              <p className="font-bold text-gray-800">عمار الياسين</p>
              <p className="text-[9px] text-gray-400 mt-0.5">
                وثيقة الهوية مرفقة
              </p>
            </div>
            <button className="bg-[#008bf1] text-white px-3 py-1 rounded-lg text-[10px] font-bold hover:bg-[#007cd7]">
              مراجعة
            </button>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <div className="text-right">
              <p className="font-bold text-gray-800">مجموعة النبيل العقارية</p>
              <p className="text-[9px] text-gray-400 mt-0.5">سجل تجاري حديث</p>
            </div>
            <button className="bg-[#008bf1] text-white px-3 py-1 rounded-lg text-[10px] font-bold hover:bg-[#007cd7]">
              مراجعة
            </button>
          </div>
        </div>
      </div>

      {/* 2. تذاكر الدعم الفني */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-50 pb-2 mb-3">
          <div className="flex items-center gap-1.5 text-slate-700 font-black text-xs">
            <MessageSquare className="w-4 h-4 text-amber-500" />
            <h3>تذاكر الدعم الفني</h3>
          </div>
          <button className="text-sky-500 text-[10px] font-bold hover:underline">
            الكل
          </button>
        </div>
        <div className="space-y-4 text-[11px]">
          {/* التذكرة الأولى */}
          <div className="border-b border-gray-50 pb-3 last:border-none last:pb-0">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] font-bold text-rose-500 bg-rose-50 px-1 rounded">
                أولوية قصوى
              </span>
              <span className="text-[9px] text-gray-400">منذ 15 د</span>
            </div>
            {/* التعديل هنا: توزيع مرن يدفع الزر لليسار والنصوص لليمين */}
            <div className="flex items-end justify-between gap-4">
              <div className="text-right">
                <p className="font-bold text-gray-800">مشكلة في تسجيل الدخول</p>
                <p className="text-[9px] text-gray-400 mt-0.5">
                  المستخدم: صيف (زائر)
                </p>
              </div>
              <button className="text-sky-500 font-bold text-[10px] hover:underline whitespace-nowrap">
                رد الآن
              </button>
            </div>
          </div>
          {/* التذكرة الثانية */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] font-bold text-sky-500 bg-sky-50 px-1 rounded">
                عادية
              </span>
              <span className="text-[9px] text-gray-400">منذ ساعة</span>
            </div>
            {/* التعديل هنا أيضاً */}
            <div className="flex items-end justify-between gap-4">
              <div className="text-right">
                <p className="font-bold text-gray-800">
                  استفسار حول عمولة الموقع
                </p>
                <p className="text-[9px] text-gray-400 mt-0.5">
                  المستخدم: محمد العبدالله
                </p>
              </div>
              <button className="text-sky-500 font-bold text-[10px] hover:underline whitespace-nowrap">
                رد الآن
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. أحدث التعليقات */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-50 pb-2 mb-3">
          <div className="flex items-center gap-1.5 text-slate-700 font-black text-xs">
            <MessageSquare className="w-4 h-4 text-sky-500" />
            <h3>أحدث التعليقات</h3>
          </div>
          <span className="text-[9px] font-black text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-md">
            24 جديد
          </span>
        </div>
        <div className="text-[11px]">
          <p className="font-bold text-gray-800">سامر الحلبي</p>
          <p className="text-gray-400 text-[10px] mt-0.5 bg-slate-50 p-2 rounded-lg leading-relaxed">
            هل العقار لا يزال متاحاً؟ وهل يوجد إمكانية للتقسيط؟
          </p>
          <div className="flex items-center gap-3 mt-2 text-[10px] text-gray-400 font-bold">
            <button className="flex items-center gap-1 text-sky-500 hover:text-sky-600">
              <CornerUpLeft className="w-3 h-3 " /> رد
            </button>
            <button className="flex items-center gap-1 text-red-400 hover:text-rose-500">
              <Trash2 className="w-3 h-3" /> حذف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
