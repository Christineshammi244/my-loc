import Image from "next/image";
import { Search, SlidersHorizontal } from "lucide-react";
import { PhoneShell } from "@/components/mobile/phone-shell";

const pic =
  "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=900&q=80";

export default function SearchCardsPage() {
  return (
    <PhoneShell title="سوريا دمشق حمص اللاذقية">
      <div className="rounded-2xl bg-white p-2">
        <div className="relative">
          <Search className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="بحث سريع"
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pr-10 pl-3 text-sm outline-none ring-[#2e84d6]/30 placeholder:text-slate-400 focus:bg-white focus:ring-2"
          />
        </div>
        <div className="mt-2 flex items-center gap-2 text-sm">
          <button className="inline-flex min-h-10 items-center gap-1 rounded-lg bg-slate-100 px-3 font-semibold text-slate-700 transition hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e84d6]/40">
            <SlidersHorizontal className="h-4 w-4" />
            تصفية
          </button>
          {["الكل", "فلل", "أرضي", "تجاري"].map((tab, i) => (
            <button
              key={tab}
              type="button"
              className={`min-h-10 rounded-full px-3 font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e84d6]/40 ${
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
      <div className="mb-2 rounded-xl bg-white p-2 text-sm text-slate-600">
        تم العثور على 150 عقار في سوريا
      </div>
      {[1, 2].map((item) => (
        <article key={item} className="mb-4 rounded-2xl border border-slate-200 bg-white p-2">
          <div className="relative h-44 overflow-hidden rounded-xl">
            <Image src={pic} alt="card" fill className="object-cover" />
          </div>
          <h3 className="mt-2 text-3xl font-extrabold">شقة فاخرة في المالكي</h3>
          <p className="text-xl text-slate-600">دمشق، المالكي، جانب النادي الدبلوماسي</p>
          <div className="mt-2 flex items-center justify-between rounded-lg border border-slate-200 p-2">
            <span className="font-bold text-[#2e84d6]">سجل دخول لعرض السعر</span>
            <button className="min-h-10 rounded-md bg-[#24a2de] px-4 py-1 font-bold text-white transition hover:bg-[#1f95cc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#24a2de]/40">
              دخول
            </button>
          </div>
        </article>
      ))}
    </PhoneShell>
  );
}
