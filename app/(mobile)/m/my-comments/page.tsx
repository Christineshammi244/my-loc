import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import { PhoneShell } from "@/components/mobile/phone-shell";

const thumb =
  "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=400&q=80";

export default function MyCommentsPage() {
  return (
    <PhoneShell title="تعليقاتي">
      <div className="rounded-2xl bg-white p-4">
        <div className="mb-3 flex border-b border-slate-200 text-sm font-bold text-[#2e84d6]">
          <button className="min-h-11 border-b-2 border-[#2e84d6] px-4 py-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e84d6]/40">
            تعليقاتي
          </button>
          <button className="min-h-11 px-4 py-2 text-slate-500 transition hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e84d6]/40">
            التعليقات (12)
          </button>
        </div>
        {[1, 2, 3].map((item) => (
          <article key={item} className="mb-4 rounded-2xl border border-slate-200 p-3">
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <button
                type="button"
                className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-lg transition hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
                aria-label="حذف التعليق"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </button>
              <button
                type="button"
                className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-lg transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e84d6]/30"
                aria-label="تعديل التعليق"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <span className="ms-auto">12 أكتوبر 2023</span>
            </div>
            <p className="text-center text-lg leading-8 text-slate-800">
              هل السعر المعروض يشمل الفرش؟ الشقة تبدو في موقع ممتاز جدا.
            </p>
            <div className="mt-3 flex items-center gap-3 rounded-xl bg-slate-100 p-2">
              <div className="relative h-14 w-20 overflow-hidden rounded-lg">
                <Image src={thumb} alt="thumbnail" fill className="object-cover" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-base font-bold">شقة سكنية تنظيم كفرسوسة</p>
                <p className="text-sm font-bold text-amber-600">3,500,000 ل.س / شهر</p>
              </div>
            </div>
          </article>
        ))}
        <button className="mx-auto block min-h-11 rounded-xl px-4 py-2 text-center font-bold text-[#2e84d6] transition hover:bg-[#2e84d6]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e84d6]/40">
          تحميل المزيد من التعليقات
        </button>
      </div>
    </PhoneShell>
  );
}
