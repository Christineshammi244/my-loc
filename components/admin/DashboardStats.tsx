import React from "react";
import { Home, Wallet, MessageSquare, ShieldAlert } from "lucide-react";

export default function DashboardStats() {
  const stats = [
    {
      title: "إجمالي العقارات",
      value: "1,842",
      badge: "+12%",
      badgeColor: "text-emerald-500 bg-emerald-50",
      icon: Home,
      iconBg: "bg-sky-100 text-sky-500",
    },
    {
      title: "المعاملات المالية",
      value: "142,500K",
      badge: "5 قيد الانتظار",
      badgeColor: "text-amber-500 bg-amber-50",
      icon: Wallet,
      iconBg: "bg-indigo-100 text-indigo-500",
    },
    {
      title: "تذاكر الدعم المفتوحة",
      value: "48",
      badge: "12 عاجل",
      badgeColor: "text-rose-500 bg-rose-50",
      icon: MessageSquare,
      iconBg: "bg-amber-100 text-amber-500",
    },
    {
      title: "طلبات التوثيق",
      value: "156",
      badge: "25 جديد",
      badgeColor: "text-purple-500 bg-purple-50",
      icon: ShieldAlert,
      iconBg: "bg-purple-100 text-purple-500",
    },
  ];

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-right"
      dir="rtl"
    >
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col justify-between min-h-[125px]"
          >
            <div className="flex items-center justify-between">
              <div className={`p-2.5 rounded-xl ${stat.iconBg}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${stat.badgeColor}`}
              >
                {stat.badge}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-[11px] font-medium text-gray-500">
                {stat.title}
              </p>
              <p className="text-xl font-black text-slate-800 mt-0.5 tabular-nums">
                {stat.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
