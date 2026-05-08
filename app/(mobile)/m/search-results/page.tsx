import Image from "next/image";
import { Search } from "lucide-react";
import { PhoneShell } from "@/components/mobile/phone-shell";

const pic =
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80";

export default function SearchResultsPage() {
  return (
    <PhoneShell title="نتائج البحث - دمشق">
      <div className="rounded-2xl bg-white p-2">
        <div className="relative">
          <Search className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="ابحث عن مدينة، حي، أو نوع العقار"
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pr-10 pl-3 text-sm outline-none ring-[#2e84d6]/30 placeholder:text-slate-400 focus:bg-white focus:ring-2"
          />
        </div>
        <div className="mt-2 flex flex-wrap gap-2 text-sm">
          {["الكل", "شقق", "فلل", "تجاري"].map((tab, i) => (
            <button
              key={tab}
              type="button"
              className={`min-h-10 rounded-full px-4 font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e84d6]/40 ${
                i === 0
                  ? "bg-[#2e84d6] text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-xl bg-white px-3 py-2 text-sm text-slate-500">
        تم العثور على 142 عقار مطابق
      </div>
      {[1, 2].map((item) => (
        <article key={item} className="rounded-2xl bg-white p-2">
          <div className="relative h-44 overflow-hidden rounded-xl">
            <Image src={pic} alt="result" fill className="object-cover" />
          </div>
          <div className="p-2">
            <h3 className="text-3xl font-extrabold">شقة فاخرة في تنظيم كفرسوسة</h3>
            <p className="text-4xl font-extrabold text-slate-900">1.2 مليار ل.س</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button className="min-h-11 rounded-lg bg-[#24a2de] py-2 font-bold text-white transition hover:bg-[#1f95cc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#24a2de]/40">
                اتصال
              </button>
              <button className="min-h-11 rounded-lg bg-emerald-600 py-2 font-bold text-white transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">
                واتساب
              </button>
            </div>
          </div>
        </article>
      ))}
    </PhoneShell>
  );
}
