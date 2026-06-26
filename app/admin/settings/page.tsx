import React from "react";
import Sidebar from "@/components/admin/sidebar";
import Header from "@/components/admin/header";
import SystemConfig from "@/components/admin/SystemConfig";
import SecurityAndAlerts from "@/components/admin/SecurityAndAlerts";
import ActivityLogTable from "@/components/admin/ActivityLogTable";

export default function SettingsPage() {
  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden" dir="rtl">
      <Sidebar active="settings" variant="default" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8 bg-[#f8fafc]">
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="text-right border-b border-gray-100 pb-3">
              <h1 className="text-xl font-black text-gray-800">
                إعدادات النظام
              </h1>
              <p className="text-xs text-gray-400 mt-0.5">
                إدارة تكوين المنصة، الأمان والتنبيهات
              </p>
            </div>

            <SystemConfig />

            <SecurityAndAlerts />

            <ActivityLogTable />
          </div>
        </main>
      </div>
    </div>
  );
}
