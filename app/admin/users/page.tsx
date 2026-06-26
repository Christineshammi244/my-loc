// src/app/admin/users/page.tsx
import React from "react";
import Link from "next/link";
import { UserPlus, Layers } from "lucide-react";
import Sidebar from "@/components/admin/sidebar";
import Header from "@/components/admin/header";
import AdminStatsCards from "@/components/admin/AdminStatsCards";
import UsersTable from "@/components/admin/UsersTable";
import QuickTransaction from "@/components/admin/QuickTransaction";

export default function UsersManagementPage() {
  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden" dir="rtl">
      <Sidebar active="users" variant="default" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header  searchPlaceholder="البحث عن المستخدمين"/>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8 bg-[#f8fafc]">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-2">
              <div className="text-right">
                <h1 className="text-xl font-black text-gray-800">
                  إدارة المستخدمين
                </h1>
                <p className="text-xs text-gray-400 mt-0.5">
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link href="/admin/users-create">
                  <button className="bg-[#008bf1] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 hover:bg-[#007cd7] transition-all shadow-sm">
                    <UserPlus className="w-4 h-4" /> إضافة سجل
                  </button>
                </Link>
                <a href="#quick-transaction" className="scroll-smooth">
                  <button className="bg-[#0f172a] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 hover:bg-slate-800 transition-all shadow-sm">
                    <Layers className="w-4 h-4" /> سجل معاملة يدوي
                  </button>
                </a>
              </div>
            </div>

            <AdminStatsCards />

            <UsersTable />

            <QuickTransaction />
          </div>
        </main>
      </div>
    </div>
  );
}