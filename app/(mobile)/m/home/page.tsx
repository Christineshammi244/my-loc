import Image from "next/image";
import { PhoneShell } from "@/components/mobile/phone-shell";

const img =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80";

export default function HomeMobilePage() {
  return (
    <PhoneShell title="الرئيسية">
      <div className="rounded-2xl bg-[#1ea0df] p-4 text-white">
        <p className="text-xl font-bold">أهلاً بك مجدداً، أحمد</p>
        <p className="text-sm text-white/90">مدير عقاري · عضو عام النظام</p>
      </div>
      <section className="rounded-2xl bg-white p-3">
        <h3 className="mb-2 text-center text-lg font-bold">محرك البحث المتقدم</h3>
        <div className="relative h-52 overflow-hidden rounded-xl">
          <Image src={img} alt="hero" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/35" />
          <button className="absolute bottom-3 left-3 right-3 rounded-xl bg-[#d8b236] py-2 font-bold text-white">
            ابدأ البحث
          </button>
        </div>
      </section>
      <section className="rounded-2xl bg-white p-3">
        <h3 className="mb-3 text-2xl font-extrabold">عقارات مميزة</h3>
        {[1, 2].map((item) => (
          <article key={item} className="mb-4 overflow-hidden rounded-2xl border border-slate-200">
            <div className="relative h-48">
              <Image src={img} alt="property" fill className="object-cover" />
            </div>
            <div className="p-3">
              <h4 className="text-2xl font-extrabold">فيلا مودرن - يعفور</h4>
              <p className="text-lg font-bold text-amber-600">2.4 مليار ل.س</p>
            </div>
          </article>
        ))}
      </section>
    </PhoneShell>
  );
}
