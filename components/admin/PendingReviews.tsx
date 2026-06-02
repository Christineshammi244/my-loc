import React from "react";
import { ShieldCheck, Check, X } from "lucide-react";

export default function PendingReviews() {
  const items = [
    {
      title: "شقة دوبلكس - المزة",
      location: "دمشق، سوريا",
      author: "ياسين خالد",
      time: "منذ ساعتين",
      price: "850M ل.س",
      img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=150&auto=format&fit=crop&q=60",
    },
    {
      title: "فيلا سياحية - اللاذقية",
      location: "الشاطئ الأزرق",
      author: "سارة مروان",
      time: "منذ 5 ساعات",
      price: "2.4B ل.س",
      img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=150&auto=format&fit=crop&q=60",
    },
  ];

  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden text-right"
      dir="rtl"
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-50">
        <div className="flex items-center gap-2 font-black text-slate-700 text-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <h2>إعلانات تحتاج مراجعة</h2>
        </div>
        <button className="text-[#008bf1] font-bold text-xs hover:underline">
          عرض الكل
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50/60 border-b border-gray-100/50 text-gray-400 font-bold">
              <th className="p-3 text-right">العقار</th>
              <th className="p-3 text-right">المعلن</th>
              <th className="p-3 text-right">السعر</th>
              <th className="p-3 text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 font-medium text-gray-700">
            {items.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50/20 transition-all">
                <td className="p-3 flex items-center gap-2">
                  <img
                    src={item.img}
                    alt=""
                    className="w-10 h-8 object-cover rounded-lg border border-gray-100"
                  />
                  <div>
                    <p className="font-bold text-gray-800">{item.title}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      {item.location}
                    </p>
                  </div>
                </td>
                <td className="p-3">
                  <p className="text-gray-800 font-bold">{item.author}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    {item.time}
                  </p>
                </td>
                <td className="p-3 font-bold text-sky-500">{item.price}</td>
                <td className="p-3">
                  <div className="flex items-center gap-1.5 justify-center">
                    <button className="p-1.5 rounded-lg border border-emerald-100 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-all">
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 rounded-lg border border-rose-100 bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
