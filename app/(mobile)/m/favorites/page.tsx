import Image from "next/image";
import { PhoneShell } from "@/components/mobile/phone-shell";

const pic =
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80";

export default function FavoritesPage() {
  return (
    <PhoneShell title="عقاراتي المفضلة">
      <div className="mb-2 flex justify-end gap-5 px-2 text-lg font-bold text-[#2e84d6]">
        <button>قائمة</button>
        <button className="text-slate-400">شبكة</button>
      </div>
      {[1, 2, 3].map((item) => (
        <article key={item} className="rounded-2xl bg-white p-3">
          <div className="relative mb-3 h-36 overflow-hidden rounded-xl">
            <Image src={pic} alt="fav" fill className="object-cover" />
          </div>
          <p className="text-sm text-[#2e84d6]">دمشق، المزة فيلات غربية</p>
          <h3 className="text-3xl font-extrabold">شقة سكنية فاخرة بإطلالة جبلية</h3>
          <p className="text-4xl font-extrabold text-amber-600">150,000,000 ل.س</p>
          <button className="mt-3 w-full rounded-xl border border-red-100 py-2 text-lg text-slate-500">
            إزالة من المفضلة
          </button>
        </article>
      ))}
    </PhoneShell>
  );
}
