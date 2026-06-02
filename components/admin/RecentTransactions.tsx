import React from "react";
import { RefreshCw, Eye } from "lucide-react";

export default function RecentTransactions() {
  const txs = [
    {
      type: "شراء",
      typeBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
      property: "شقة المزة أوتوستراد",
      meta: "بواسطة: رامي حداد",
      price: "1.2B ل.س",
      status: "قيد المراجعة",
      statusColor: "bg-amber-500",
    },
    {
      type: "بيع",
      typeBg: "bg-sky-50 text-sky-600 border-sky-100",
      property: "مكتب تجاري - البرامكة",
      meta: "بواسطة: عقارات الفيحاء",
      price: "450M ل.س",
      status: "مكتملة",
      statusColor: "bg-emerald-500",
    },
  ];

  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden text-right"
      dir="rtl"
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-50">
        <div className="flex items-center gap-2 font-black text-slate-700 text-sm">
          <RefreshCw className="w-4 h-4 text-sky-500" />
          <h2>طلبات المعاملات الأخيرة</h2>
        </div>
        <button className="text-[#008bf1] font-bold text-xs hover:underline">
          كل المعاملات
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50/60 border-b border-gray-200/50 text-gray-400 font-bold">
              <th className="p-3 text-right">النوع</th>
              <th className="p-3 text-right">العقار / العميل</th>
              <th className="p-3 text-right">المبلغ</th>
              <th className="p-3 text-right">الحالة</th>
              <th className="p-3 text-center">الإجراء</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 font-medium text-gray-700">
            {txs.map((tx, idx) => (
              <tr key={idx} className="hover:bg-slate-50/20 transition-all">
                <td className="p-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-lg border text-[10px] font-bold ${tx.typeBg}`}
                  >
                    {tx.type}
                  </span>
                </td>
                <td className="p-3">
                  <p className="font-bold text-gray-800">{tx.property}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{tx.meta}</p>
                </td>
                <td className="p-3 font-bold text-gray-800">{tx.price}</td>
                <td className="p-3">
                  <div className="flex items-center gap-1.5 justify-start">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${tx.statusColor}`}
                    ></span>
                    <span>{tx.status}</span>
                  </div>
                </td>
                <td className="p-3 text-center">
                  <button className="text-sky-500 hover:text-sky-700 p-1 rounded-lg bg-slate-50 inline-block">
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
