import React from "react";
import { Database, ExternalLink } from "lucide-react";

export default function ActivityLogTable() {
  const logs = [
    {
      admin: "أحمد المحمد",
      action: "تغيير إعدادات النظام",
      badgeColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
      ip: "192.168.1.45",
      time: "منذ 5 دقائق",
    },
    {
      admin: "سارة خليل",
      action: "توثيق مستخدم جديد",
      badgeColor: "bg-sky-50 text-sky-600 border-sky-100",
      ip: "176.12.98.2",
      time: "منذ ساعتين",
    },
    {
      admin: "أحمد المحمد",
      action: "حذف عقار مخالف",
      badgeColor: "bg-amber-50 text-amber-600 border-amber-100",
      ip: "192.168.1.45",
      time: "منذ 4 ساعات",
    },
  ];

  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden text-right"
      dir="rtl"
    >
      {/* هيدر اللوحة */}
      <div className="p-5 flex items-center justify-between border-b border-gray-50">
        <div className="flex items-center gap-2 text-slate-700">
          <Database className="w-5 h-5 text-slate-400" />
          <h2 className="text-md font-black">الخصوصية وسجلات النشاط</h2>
        </div>
        <button className="text-[#008bf1] font-bold text-xs flex items-center gap-1 hover:underline">
          <ExternalLink className="w-3.5 h-3.5" /> عرض جميع السجلات
        </button>
      </div>

      {/* الجدول المستجيب */}
      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b border-gray-200/50 text-gray-400 font-bold text-[11px]">
              <th className="p-4">المدير</th>
              <th className="p-4">النشاط</th>
              <th className="p-4">عنوان IP</th>
              <th className="p-4">التوقيت</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-xs font-medium text-gray-700">
            {logs.map((log, index) => (
              <tr key={index} className="hover:bg-slate-50/30 transition-all">
                <td className="p-4 font-bold text-gray-800">{log.admin}</td>
                <td className="p-4">
                  <span
                    className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold ${log.badgeColor}`}
                  >
                    {log.action}
                  </span>
                </td>
                <td
                  className="p-4 font-mono text-gray-500 text-left md:text-right"
                  dir="ltr"
                >
                  {log.ip}
                </td>
                <td className="p-4 text-gray-400">{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
