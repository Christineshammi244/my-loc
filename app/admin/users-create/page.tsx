import React from "react";
import Sidebar from "@/components/admin/sidebar";
import Header from "@/components/admin/header";
import UserForm from "@/components/admin/UserForm";
import StatsCards from "@/components/admin/StatsCards";

export default function AdminDashboard() {
  return (
    <div
      className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans select-none"
      dir="rtl"
    >
      {/* 1. القائمة الجانبية في اليمين */}
      <Sidebar active="users" variant="default" />

      {/* 2. منطقة المحتوى في اليسار */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* شريط البحث والبروفايل العلوي */}
        <Header searchPlaceholder=""/>

        {/* محتوى الصفحة القابل للتمرير */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8 bg-[#f8fafc]">
          <div className="max-w-5xl mx-auto space-y-4">
            {/* فورم إضافة مستخدم */}
            <UserForm />

            {/* بطاقات الإحصائيات الدقيقة */}
            <StatsCards />
          </div>
        </main>
      </div>
    </div>
  );
}
