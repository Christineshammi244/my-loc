import Image from "next/image";
import { PhoneShell } from "@/components/mobile/phone-shell";

const img =
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80";

export default function RequestDetailsPage() {
  return (
    <PhoneShell title="تفاصيل الطلب المرفوض">
      <article className="rounded-2xl bg-white p-3">
        <div className="relative h-44 overflow-hidden rounded-xl">
          <Image src={img} alt="office" fill className="object-cover" />
        </div>
        <h3 className="mt-3 text-3xl font-extrabold">مكتب تجاري في كفرسوسة</h3>
        <p className="text-3xl font-extrabold text-[#2d89c6]">500,000,000 ل.س</p>
      </article>
      <section className="rounded-2xl bg-white p-3">
        <h4 className="text-2xl font-bold text-red-600">حالة الطلب: مرفوض</h4>
        <div className="mt-2 rounded-xl bg-slate-100 p-3 text-slate-700">
          يتبين أن الملكية المقدمة غير مكتملة ولا تتطابق مع السجلات العقارية.
        </div>
      </section>
      <button className="w-full rounded-xl bg-[#24a2de] py-3 text-xl font-bold text-white">
        إعادة التقديم مع التعديلات
      </button>
      <button className="w-full rounded-xl border-2 border-[#24a2de] bg-white py-3 text-xl font-bold text-[#24a2de]">
        تواصل مع الدعم الفني
      </button>
    </PhoneShell>
  );
}
