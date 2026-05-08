import { CheckCircle2 } from "lucide-react";
import { PhoneShell } from "@/components/mobile/phone-shell";

export default function PurchaseSuccessPage() {
  return (
    <PhoneShell title="تم بنجاح">
      <section className="rounded-2xl bg-white p-5 text-center">
        <div className="mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-blue-100">
          <CheckCircle2 className="h-16 w-16 text-[#2f56cc]" />
        </div>
        <h2 className="text-4xl font-extrabold text-slate-900">تم بنجاح!</h2>
        <p className="mt-4 text-lg text-slate-600">تم إرسال طلب الشراء الخاص بك بنجاح</p>
        <p className="mt-1 text-xl font-semibold text-[#2e84a6]">
          سيتم التواصل معك بعد مراجعة الإدارة للوثائق خلال 24 ساعة
        </p>
        <button className="mt-8 w-full rounded-xl bg-[#25a3dd] py-4 text-xl font-bold text-white">
          إدارة مشترياتي
        </button>
        <button className="mt-3 w-full rounded-xl border border-slate-200 bg-white py-4 text-xl font-bold text-slate-700">
          العودة الرئيسية
        </button>
        <div className="mt-8 rounded-xl bg-blue-50 p-4 text-sm text-slate-600">
          ستتلقى إشعارا عبر بريدك الإلكتروني المسجل فور إكمال عملية التحقق.
        </div>
      </section>
    </PhoneShell>
  );
}
