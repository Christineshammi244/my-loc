import React from "react";
import { Shield, Bell, ChevronLeft, Lock } from "lucide-react";

export default function SecurityAndAlerts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right" dir="rtl">
      {/* كرت إعدادات الأمان */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-rose-500 border-b border-gray-50 pb-4 mb-5">
            <Shield className="w-5 h-5" />
            <h2 className="text-md font-black text-gray-800">إعدادات الأمان</h2>
          </div>

          {/* تفعيل الـ 2FA */}
          <div className="bg-slate-50/50 border border-gray-100/50 rounded-xl p-4 flex items-center justify-between mb-4">
            {/* زر التبديل التلقائي (Toggle) */}
            <div className="text-right">
              <p className="text-xs font-bold text-gray-700">
                المصادقة الثنائية (2FA)
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">
                إضافة طبقة حماية إضافية لحسابات المديرين
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#008bf1]"></div>
            </label>
          </div>
        </div>

        {/* الروابط الداخلية للأمان */}
        <div className="space-y-2">
          <button className="w-full bg-white border border-gray-100 rounded-xl p-3.5 flex items-center justify-between text-gray-600 hover:bg-gray-50 transition-all text-xs font-bold">
            <div className="flex items-center gap-2">
              <span>تغيير كلمة مرور النظام</span>
              <Lock className="w-3.5 h-3.5 text-gray-400" />
            </div>
            <ChevronLeft className="w-4 h-4 text-gray-400" />
          </button>
          <button className="w-full bg-white border border-gray-100 rounded-xl p-3.5 flex items-center justify-between text-gray-600 hover:bg-gray-50 transition-all text-xs font-bold">
            <div className="flex items-center gap-2">
              <span>سياسة كلمات المرور</span>
              <Shield className="w-3.5 h-3.5 text-gray-400" />
            </div>
            <ChevronLeft className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* كرت إدارة التنبيهات */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-2 text-amber-500 border-b border-gray-50 pb-4 mb-5">
          <Bell className="w-5 h-5" />
          <h2 className="text-md font-black text-gray-800">إدارة التنبيهات</h2>
        </div>

        <div className="space-y-5">
          {/* تنبيه 1 */}
          <div className="flex items-center justify-between">
            <div className="text-right">
              <p className="text-xs font-bold text-gray-700">
                تنبيهات النظام الفورية
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">
                تلقي إشعارات عند إضافة عقارات جديدة
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#008bf1]"></div>
            </label>
          </div>
          {/* تنبيه 2 */}
          <div className="flex items-center justify-between">
            <div className="text-right">
              <p className="text-xs font-bold text-gray-700">
                تنبيهات البريد الإلكتروني
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">
                إرسال تقرير يومي بطلبات التوثيق
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#008bf1]"></div>
            </label>
          </div>

          {/* تنبيه 3 */}
          <div className="flex items-center justify-between">
            <div className="text-right">
              <p className="text-xs font-bold text-gray-700">
                رسائل التحقق SMS
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">
                تفعيل بوابة رسائل التحقق للجوال
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#008bf1]"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
