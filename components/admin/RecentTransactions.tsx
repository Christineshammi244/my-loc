import React from "react";
import { RefreshCw, Eye } from "lucide-react";

// تعريف الواجهة لمنع أخطاء الـ TypeScript في الداش بورد
interface RecentTransactionsProps {
  transactions: any[]; 
}

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const txs = transactions || [];

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
            {txs.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-400 font-bold">
                  لا توجد طلبات معاملات مسجلة في قاعدة البيانات حالياً.
                </td>
              </tr>
            ) : (
              txs.map((tx, idx) => {
                const isBuy = tx.type === "شراء"  ||tx.type === "BUY" || tx.type === "SALE";
                const isCompleted = tx.status === "COMPLETED" || tx.status === "مكتملة";

                const typeText = isBuy ? "شراء" : "بيع";
                const typeBg = isBuy 
                  ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                  : "bg-sky-50 text-sky-600 border-sky-100";

                const statusText = isCompleted ? "مكتملة" : "قيد المراجعة";
                const statusColor = isCompleted ? "bg-emerald-500" : "bg-amber-500";

                return (
                  <tr key={tx.id || idx} className="hover:bg-slate-50/20 transition-all">
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded-lg border text-[10px] font-bold ${typeBg}`}>
                        {typeText}
                      </span>
                    </td>
                    <td className="p-3">
                      <p className="font-bold text-gray-800">{tx.property?.title || "عقار غير محدد"}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">بواسطة: {tx.user?.name || "مستخدم غير معروف"}</p>
                    </td>
                    <td className="p-3 font-bold text-gray-800">
                      {tx.amount ? tx.amount.toLocaleString() + " ل.س" : "0 ل.س"}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1.5 justify-start">
                        <span className={`w-1.5 h-1.5 rounded-full ${statusColor}`}></span>
                        <span>{statusText}</span>
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <button className="text-sky-500 hover:text-sky-700 p-1 rounded-lg bg-slate-50 inline-block">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}