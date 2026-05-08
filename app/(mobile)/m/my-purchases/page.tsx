import Image from "next/image";
import { PhoneShell } from "@/components/mobile/phone-shell";

const pic =
  "https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12?auto=format&fit=crop&w=900&q=80";

export default function MyPurchasesPage() {
  return (
    <PhoneShell title="مشترياتي">
      {[1, 2].map((item) => (
        <article key={item} className="mb-3 overflow-hidden rounded-2xl bg-white">
          <div className="relative h-44">
            <Image src={pic} alt="purchase" fill className="object-cover" />
          </div>
          <div className="p-3">
            <h3 className="text-3xl font-extrabold">شقة سكنية - مشروع دمر دمشق</h3>
            <p className="mt-1 text-2xl font-extrabold text-[#2e84d6]">650,000,000 ل.س</p>
            <div className="mt-3 rounded-xl bg-emerald-50 p-2 text-sm text-emerald-800">
              حالة المراجعة: تمت الموافقة
            </div>
            <button className="mt-3 w-full rounded-xl bg-[#24a2de] py-2 text-lg font-bold text-white">
              تفاصيل العقد
            </button>
          </div>
        </article>
      ))}
    </PhoneShell>
  );
}
