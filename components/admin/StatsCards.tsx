// src/components/admin/StatsCards.tsx
import React from "react";
import { Users, Store, UserCheck, Zap, LineChart } from "lucide-react";

export default function StatsCards() {
  const stats = [
    {
      title: "إجمالي المستخدمين",
      value: "1,284",
      subtext: "↗ 12%+ منذ الشهر الماضي",
      subtextColor: "text-[#10b981]",
      icon: Users,
      iconBg: "bg-[#e5f3fe]",
      iconColor: "text-[#008bf1]",
      borderSide: "border-r-4 border-r-[#008bf1]",
    },
    {
      title: "عدد البائعين",
      value: "452",
      subtext: "نشاط عالي في دمشق",
      subtextColor: "text-gray-400",
      icon: Store,
      iconBg: "bg-[#fef3c7]",
      iconColor: "text-[#d97706]",
      borderSide: "border-r-4 border-r-[#f59e0b]",
    },
    {
      title: "عدد المشترين",
      value: "832",
      subtext: "↗ زيادة في طلبات الشقق",
      subtextColor: "text-[#10b981]",
      icon: UserCheck,
      iconBg: "bg-[#ecfdf5]",
      iconColor: "text-[#10b981]",
      borderSide: "border-r-4 border-r-[#10b981]",
    },
    {
      title: "مستخدمين نشطين",
      value: "156",
      subtext: "خلال الـ 24 ساعة الماضية",
      subtextColor: "text-gray-400",
      icon: Zap,
      iconBg: "bg-[#f3f4f6]",
      iconColor: "text-gray-500",
      borderSide: "border-r-4 border-r-gray-400",
    },
  ];

  return (
    <div className="space-y-5 text-right mt-12" dir="rtl">
      {/* عنوان القسم السفلي */}
      <h3 className="text-md font-bold text-gray-800 flex items-center gap-2 justify-start">
        <LineChart className="w-5 h-5 text-amber-500" />
        <span>إحصائيات المستخدمين الحالية</span>
      </h3>

      {/* شبكة البطاقات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className={` rounded-xl  p-5 shadow flex flex-col justify-between transition-all hover:shadow-md ${card.borderSide}`}
            >
              <div className="flex items-start justify-between">
                <div
                  className={`p-2.5 rounded-xl ${card.iconBg} ${card.iconColor}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-400">
                    {card.title}
                  </p>
                  <p className="text-2xl font-black text-gray-800 mt-1">
                    {card.value}
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3  border-gray-50">
                <p className={`text-[11px] font-bold ${card.subtextColor}`}>
                  {card.subtext}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
