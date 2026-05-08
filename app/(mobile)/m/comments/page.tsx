import { MessageCircleMore, Send } from "lucide-react";
import { PhoneShell } from "@/components/mobile/phone-shell";

export default function CommentsPage() {
  return (
    <PhoneShell title="التعليقات">
      <div className="rounded-2xl bg-white p-4">
        <div className="mb-3 flex border-b border-slate-200 text-sm font-bold text-[#2e84d6]">
          <button className="min-h-11 border-b-2 border-[#2e84d6] px-4 py-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e84d6]/40">
            تعليقاتي
          </button>
          <button className="min-h-11 px-4 py-2 text-slate-500 transition hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e84d6]/40">
            التعليقات (12)
          </button>
        </div>
        <div className="mb-4 flex flex-wrap gap-2 text-sm">
          {["الكل", "شقق دمشق", "فيلا طرطوس", "المباعة"].map((item, i) => (
            <button
              type="button"
              key={item}
              className={`min-h-10 rounded-full px-4 py-1.5 font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e84d6]/40 ${
                i === 0
                  ? "bg-[#35a4e8] text-white"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        {[1, 2, 3].map((item) => (
          <article key={item} className="mb-3 rounded-2xl border border-slate-200 p-3">
            <p className="text-right text-lg font-bold">أحمد المحمد</p>
            <p className="mt-2 text-center text-slate-700">
              هل الشقة مفروشة؟ وهل يوجد إمكانية للتقسيط لمدة 12 شهراً؟
            </p>
            <button
              type="button"
              className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold text-[#2e84d6] transition hover:bg-[#2e84d6]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e84d6]/40"
            >
              <span>رد سريع</span>
              <MessageCircleMore className="h-4 w-4" />
            </button>
            {item === 1 ? (
              <div className="mt-3 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2">
                <Send className="h-4 w-4 text-[#2e84d6]" />
                <input
                  className="h-10 w-full rounded-lg bg-transparent px-2 text-sm outline-none ring-[#2e84d6]/30 placeholder:text-slate-400 focus:bg-white focus:ring-2"
                  placeholder="اكتب ردك هنا..."
                />
              </div>
            ) : null}
          </article>
        ))}
        <button className="mx-auto block min-h-11 rounded-xl px-4 py-2 text-center font-bold text-[#2e84d6] transition hover:bg-[#2e84d6]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e84d6]/40">
          تحميل المزيد من التعليقات
        </button>
      </div>
    </PhoneShell>
  );
}
