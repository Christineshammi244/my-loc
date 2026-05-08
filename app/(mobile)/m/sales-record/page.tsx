import Image from "next/image";
import { PhoneShell } from "@/components/mobile/phone-shell";

const img =
  "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80";

export default function SalesRecordPage() {
  return (
    <PhoneShell title="سجل المبيعات">
      <div className="mb-2 flex gap-2 text-sm">
        {["الكل", "مكتمل", "معلق", "مرفوض"].map((x, i) => (
          <span
            key={x}
            className={`rounded-lg px-3 py-1 ${i === 0 ? "bg-[#2e84d6] text-white" : "bg-white text-slate-600"}`}
          >
            {x}
          </span>
        ))}
      </div>
      {[1, 2, 3].map((item) => (
        <article key={item} className="mb-3 rounded-2xl bg-white p-3">
          <div className="flex items-center gap-3">
            <div className="relative h-20 w-28 overflow-hidden rounded-lg">
              <Image src={img} alt="sale" fill className="object-cover" />
            </div>
            <div>
              <p className="text-xs text-slate-400">رقم العملية SALE-88218</p>
              <h3 className="text-2xl font-extrabold">شقة سكنية - المزة</h3>
              <p className="text-2xl font-extrabold text-[#2e84d6]">450,000,000 ل.س</p>
            </div>
          </div>
        </article>
      ))}
    </PhoneShell>
  );
}
