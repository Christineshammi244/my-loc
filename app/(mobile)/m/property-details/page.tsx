import Image from "next/image";
import { PhoneShell } from "@/components/mobile/phone-shell";

const img =
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80";

export default function PropertyDetailsPage() {
  return (
    <PhoneShell title="تفاصيل العقار">
      <section className="rounded-2xl bg-white p-3">
        <div className="relative h-48 overflow-hidden rounded-xl">
          <Image src={img} alt="property" fill className="object-cover" />
        </div>
        <h3 className="mt-3 text-3xl font-extrabold">شقة سكنية فاخرة في المالكي</h3>
        <p className="text-4xl font-extrabold text-amber-600">750,000,000 ل.س</p>
        <div className="mt-3 rounded-xl bg-sky-50 p-3 text-sm">مكتب العقارات الذهبي</div>
        <p className="mt-3 text-sm leading-7 text-slate-700">
          شقة فاخرة ضمن برج حديث، مساحة واسعة وتشطيبات ممتازة مع إطلالة بانورامية.
        </p>
        <div className="mt-3 h-36 rounded-xl bg-slate-100 p-3">الموقع على الخريطة</div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button className="rounded-lg bg-[#d8b236] py-2 font-bold text-white">طلب شراء</button>
          <button className="rounded-lg bg-[#24a2de] py-2 font-bold text-white">اتصال</button>
        </div>
      </section>
    </PhoneShell>
  );
}
