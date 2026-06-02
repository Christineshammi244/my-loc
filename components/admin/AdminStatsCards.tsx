// src/components/admin/AdminStatsCards.tsx
import React from "react";
import { Users, Tag, ShoppingCart, CheckCircle } from "lucide-react";

export default function AdminStatsCards() {
  const stats = [
    {
      title: "إجمالي المستخدمين",
      value: "1,284",
      subtext: "+12%",
      subtextColor: "text-emerald-500",
      icon: Users,
      iconBg: "bg-sky-50",
      iconColor: "text-sky-500",
    },
    {
      title: "عدد البائعين",
      value: "412",
      subtext: "+5%",
      subtextColor: "text-emerald-500",
      icon: Tag,
      iconBg: "bg-slate-50",
      iconColor: "text-slate-500",
    },
    {
      title: "عدد المشترين",
      value: "872",
      subtext: "-2%",
      subtextColor: "text-rose-500",
      icon: ShoppingCart,
      iconBg: "bg-sky-50",
      iconColor: "text-sky-500",
    },
    {
      title: "مستخدمين نشطين حالياً",
      value: "56",
      subtext: "نشط",
      subtextColor: "text-emerald-500",
      icon: CheckCircle,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-500",
    },
  ];

  return (
    <div className="w-full text-right mt-4" dir="rtl">
      {/* شبكة البطاقات المنفصلة */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col justify-between min-h-[130px]"
            >
              {/* القسم العلوي: النسبة على اليمين والأيقونة على اليسار */}
              <div className="flex items-center justify-between">
                <div
                  className={`p-2.5 rounded-xl ${card.iconBg} ${card.iconColor}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-bold ${card.subtextColor}`}>
                  {card.subtext}
                </span>
              </div>

              {/* القسم السفلي: العنوان والرقّم */}
              <div className="text-right mt-4">
                <p className="text-[11px] font-medium text-gray-400">
                  {card.title}
                </p>
                <p className="text-2xl font-black text-gray-800 mt-1 tabular-nums">
                  {card.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
