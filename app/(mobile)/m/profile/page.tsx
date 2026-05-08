import { PhoneShell } from "@/components/mobile/phone-shell";

export default function ProfileEditPage() {
  return (
    <PhoneShell title="تعديل الملف الشخصي">
      <section className="rounded-2xl bg-white p-4">
        <div className="mb-4 text-center">
          <div className="mx-auto mb-2 h-24 w-24 rounded-full bg-slate-300" />
          <p className="text-3xl font-extrabold">أحمد المصطفى</p>
          <p className="text-slate-500">دمشق سوريا</p>
        </div>
        {[
          ["الاسم الكامل", "أحمد المصطفى"],
          ["رقم الهاتف", "+963 933 123 456"],
          ["البريد الإلكتروني", "ahmad@syria-aqar.com"],
        ].map(([label, value]) => (
          <div key={label} className="mb-3">
            <p className="mb-1 text-sm text-slate-500">{label}</p>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">{value}</div>
          </div>
        ))}
        <div className="mb-4 rounded-xl bg-emerald-50 p-3">
          <p className="font-bold text-emerald-700">حالة الحساب: موثق من الإدارة</p>
          <p className="text-sm text-slate-600">تم توثيق هويتك بنجاح.</p>
        </div>
        <button className="w-full rounded-xl bg-[#24a2de] py-3 text-xl font-bold text-white">
          حفظ التغييرات
        </button>
        <button className="mt-3 w-full rounded-xl border border-red-200 bg-white py-3 text-xl font-bold text-red-400">
          حذف التغييرات
        </button>
      </section>
    </PhoneShell>
  );
}
