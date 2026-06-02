import React from "react";
import { Globe } from "lucide-react";

export default function LocationDistribution() {
  const cities = [
    { name: "دمشق", percentage: 45, width: "w-[45%]", color: "bg-sky-500" },
    { name: "حلب", percentage: 22, width: "w-[22%]", color: "bg-amber-500" },
    {
      name: "اللاذقية",
      percentage: 18,
      width: "w-[18%]",
      color: "bg-indigo-500",
    },
  ];

  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm text-right relative overflow-hidden flex flex-col justify-between min-h-[250px]"
      dir="rtl"
    >
      <div className="flex items-center gap-2 font-black text-slate-700 text-sm border-b border-gray-50 pb-3 mb-4 justify-start">
        <Globe className="w-4 h-4 text-sky-500" />
        <h2>توزيع العقارات حسب المحافظة</h2>
      </div>

      <div className="space-y-4 relative z-10">
        {cities.map((city, idx) => (
          <div key={idx} className="space-y-1">
            <div
              className="flex  flex-row-reverse items-center justify-between text-xs font-bold text-gray-700"
              dir="rtl"
            >
              <span className="text-left">{city.percentage}%</span>
              <span className="text-right ">{city.name}</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex justify-start">
              <div
                className={`${city.color} h-full rounded-full ${city.width}`}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* لمشة الخلفية الجغرافية الدائرية التي بالصورة أسفل اليسار */}
      <div className="absolute -bottom-6 -left-6 w-24 h-24 border-4 border-slate-100 rounded-full opacity-40 pointer-events-none flex items-center justify-center">
        <div className="w-16 h-16 border-2 border-slate-100 rounded-full"></div>
      </div>
    </div>
  );
}
