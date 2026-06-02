import React from "react";
import Sidebar from "@/components/admin/sidebar";
import Header from "@/components/admin/header";
import SystemConfig from "@/components/admin/SystemConfig";
import SecurityAndAlerts from "@/components/admin/SecurityAndAlerts";
import ActivityLogTable from "@/components/admin/ActivityLogTable";

export default function SettingsPage() {
  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden" dir="rtl">
      {/* 1. القائمة الجانبية (اجعلي الـ active يشير للإعدادات) */}
      <Sidebar active="settings" variant="default" />

      {/* 2. حاوية المحتوى الأيسر الرئيسي */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* الهيدر المشترك العلوي مع حقل البحث الشخصي بالبروفايل */}
        <Header />

        {/* مساحة عرض المحتوى القابل للتمرير بمرونة */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8 bg-[#f8fafc]">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* عنوان الصفحة التوضيحي المخصص بالصورة */}
            <div className="text-right border-b border-gray-100 pb-3">
              <h1 className="text-xl font-black text-gray-800">
                إعدادات النظام
              </h1>
              <p className="text-xs text-gray-400 mt-0.5">
                إدارة تكوين المنصة، الأمان والتنبيهات
              </p>
            </div>

            {/* المكون الأول: الإعدادات الأساسية وحفظ التغييرات */}
            <SystemConfig />

            {/* المكون الثاني: الأمان والتنبيهات جنباً إلى جنب */}
            <SecurityAndAlerts />

            {/* المكون الثالث: الخصوصية وسجل النشاط */}
            <ActivityLogTable />
          </div>
        </main>
      </div>
    </div>
  );
}
