import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import { PhoneShell } from "@/components/mobile/phone-shell";

export default function NotificationsPage() {
  return (
    <PhoneShell title="الإشعارات">
      <div className="rounded-2xl bg-white p-3">
        <div className="mb-3 flex justify-between text-sm font-bold">
          <span className="text-[#2e84d6]">الكل</span>
          <span className="text-slate-500">عقاراتي</span>
          <span className="text-slate-500">الطلبات</span>
        </div>
        <p className="mb-2 text-sm font-bold text-slate-500">اليوم</p>
        <article className="mb-3 rounded-2xl border-r-4 border-emerald-500 bg-white p-3 shadow-sm">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            <div>
              <h3 className="text-2xl font-extrabold">تم قبول إعلانك</h3>
              <p className="text-sm text-slate-600">شقة سكنية حي المزة - دمشق</p>
            </div>
          </div>
        </article>
        <article className="mb-3 rounded-2xl border-r-4 border-red-400 bg-white p-3 shadow-sm">
          <div className="flex items-start gap-2">
            <XCircle className="h-5 w-5 text-red-500" />
            <div>
              <h3 className="text-2xl font-extrabold">تم رفض طلب الشراء</h3>
              <p className="text-sm text-slate-600">بسبب الفرق السعري عن التقييم</p>
            </div>
          </div>
        </article>
        <p className="mb-2 mt-4 text-sm font-bold text-slate-500">أمس</p>
        <article className="mb-3 rounded-2xl bg-slate-50 p-3">
          <Info className="mb-1 h-5 w-5 text-sky-500" />
          <h3 className="text-xl font-bold">تحديث في حالة الطلب</h3>
        </article>
        <article className="rounded-2xl bg-slate-50 p-3">
          <AlertTriangle className="mb-1 h-5 w-5 text-amber-500" />
          <h3 className="text-xl font-bold">تنبيه انتهاء الإعلان</h3>
        </article>
      </div>
    </PhoneShell>
  );
}
