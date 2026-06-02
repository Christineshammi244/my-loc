// src/components/admin/UsersTable.tsx
import React from "react";
import {
  Edit2,
  FileText,
  Ban,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Download,
} from "lucide-react";

export default function UsersTable() {
  const users = [
    {
      id: 1,
      name: "سامر الجابري",
      email: "samer.jabri@example.com",
      role: "بائع",
      phone: "+963 944 556 778",
      city: "دمشق",
      date: "2023/10/12",
      avatar: "👨‍💼",
    },
    {
      id: 2,
      name: "لينا حامد",
      email: "lina.h@example.com",
      role: "مشتري",
      phone: "+963 933 112 233",
      city: "حلب",
      date: "2023/11/05",
      avatar: "👩‍💼",
    },
    {
      id: 3,
      name: "مازن قطان",
      email: "mazin.q@example.com",
      role: "بائع",
      phone: "+963 955 889 900",
      city: "اللاذقية",
      date: "2023/09/28",
      avatar: "👨‍💼",
    },
  ];

  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
      dir="rtl"
    >
      {/* أدوات التصفية والتحكم العلوية */}
      <div className="p-5 border-b border-gray-50 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl">
          <button className="px-4 py-1.5 text-xs font-bold rounded-lg bg-white text-[#008bf1] shadow-sm">
            الكل
          </button>
          <button className="px-4 py-1.5 text-xs font-bold rounded-lg text-gray-500 hover:bg-gray-100">
            البائعين
          </button>
          <button className="px-4 py-1.5 text-xs font-bold rounded-lg text-gray-500 hover:bg-gray-100">
            المشترين
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 border border-gray-200 text-gray-600 px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-gray-50">
            <SlidersHorizontal className="w-3.5 h-3.5" /> تصفية
          </button>
          <button className="flex items-center gap-1.5 border border-gray-200 text-gray-600 px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-gray-50">
            <Download className="w-3.5 h-3.5" /> تصدير
          </button>
        </div>
      </div>

      {/* الجدول الاستجابي */}
      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse text-xs">
          <thead>
            <tr className="bg-gray-50/70 text-gray-400 font-bold border-b border-gray-100">
              <th className="p-4">المستخدم</th>
              <th className="p-4">النوع</th>
              <th className="p-4">رقم الهاتف</th>
              <th className="p-4">المدينة</th>
              <th className="p-4">تاريخ الانضمام</th>
              <th className="p-4 text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-gray-700">
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50/50 transition-colors"
              >
                <td className="p-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm">
                    {user.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{user.name}</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      {user.email}
                    </p>
                  </div>
                </td>
                <td className="p-4">
                  <span
                    className={`px-2.5 py-1 rounded-md font-bold text-[10px] ${user.role === "بائع" ? "bg-[#e0f2fe] text-[#0369a1]" : "bg-[#ecfdf5] text-[#047857]"}`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="p-4 font-medium tabular-nums">{user.phone}</td>
                <td className="p-4 font-medium">{user.city}</td>
                <td className="p-4 text-gray-400 tabular-nums">{user.date}</td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2"></div>
                  <button className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">
                    <FileText className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Ban className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* الترقيم السفلي (Pagination) */}
      <div className="p-4 border-t border-gray-50 flex items-center justify-between text-gray-400 font-bold text-[11px]">
        <span className="tabular-nums text-gray-500">
          عرض 1 إلى 10 من أصل 1,284 مستخدم
        </span>
        <div className="flex items-center gap-1.5">
          <button className="p-1 border border-gray-100 rounded-lg hover:bg-gray-50">
            <ChevronRight className="w-4 h-4" />
          </button>
          <button className="px-2.5 py-1 rounded-lg bg-[#008bf1] text-white">
            1
          </button>
          <button className="px-2.5 py-1 rounded-lg hover:bg-gray-50">2</button>
          <button className="px-2.5 py-1 rounded-lg hover:bg-gray-50">3</button>
          <button className="p-1 border border-gray-100 rounded-lg hover:bg-gray-50">
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
