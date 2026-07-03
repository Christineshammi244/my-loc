export const dynamic ="force-dynamic";
import { PhoneShell } from "@/components/mobile/phone-shell";
import { getUserProfile } from "@/app/actions/user";
import Image from "next/image";
import { UserIcon } from "lucide-react";

export default async function ProfilePage() {
  // 1. جلب بيانات المستخدم الحقيقية من قاعدة البيانات
  const user = await getUserProfile();

  return (
    <PhoneShell title="الملف الشخصي">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        {/* قسم الصورة الشخصية المنسق من قبلكِ */}
        <div className="flex flex-col items-center border-b border-slate-100 pb-6">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-[#1ea0df]">
            {user?.image ? (
              <Image
                src={user?.image}
                alt="profile"
                fill
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="flex flex-col items-center justify-center text-slate-400 text-4xl h-full w-full">
                <UserIcon className="w-12 h-12 text-slate-400" />
              </span>
            )}
          </div>
          {/* ✅ تم الإصلاح هنا: إضافة || بين الاسم والقيمة البديلة */}
          <h2 className="mt-3 text-2xl font-black text-slate-800">
            {user?.name || "مستخدم نظامي"}
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">عضو مسجل في المنصة</p>
        </div>

        {/* قسم تفاصيل البيانات الحقيقية من قاعدة البيانات */}
        <div className="mt-6 space-y-4 text-right">
          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1">البريد الإلكتروني</label>
            {/* ✅ تم الإصلاح هنا أيضاً: إضافة || بين البريد والقيمة البديلة */}
            <p className="rounded-xl bg-slate-50 p-3 text-sm font-semibold text-slate-700 border border-slate-100">
              {user?.email || "لا يوجد بريد إلكتروني"}
            </p>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1">معرّف النظام الشخصي (Clerk ID)</label>
            <p className="rounded-xl bg-slate-50 p-3 text-xs font-mono text-slate-500 border border-slate-100 break-all select-all">
              {user?.id || "غير متوفر"}
            </p>
          </div>
        </div>

        {/* حقول البيانات الإضافية الثابتة المصممة */}
        <div className="mt-6">
          {[
            ["الاسم الكامل الثابت", "أحمد المصطفى"],
            ["رقم الهاتف", "+963 933 123 456"],
          ].map(([label, value]) => (
            <div key={label} className="mb-3 text-right">
              <p className="mb-1 text-sm text-slate-500">{label}</p>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-semibold text-slate-700">
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* حالة الحساب الموثق */}
        <div className="mb-6 rounded-xl bg-emerald-50 p-3 text-right">
          <p className="font-bold text-emerald-700">
            حالة الحساب: موثق من الإدارة
          </p>
          <p className="text-sm text-slate-600">تم توثيق هويتك بنجاح.</p>
        </div>

        {/* أزرار التحكم والعمليات */}
        <div className="mt-6 space-y-3">
          <button className="w-full rounded-xl bg-[#1ea0df] py-3 text-center font-bold text-white transition hover:bg-[#1ea0df]/95">
            تعديل البيانات الشخصية
          </button>
          <button className="w-full rounded-xl border border-slate-200 py-3 text-center font-bold text-slate-600 transition hover:bg-slate-50">
            تسجيل الخروج
          </button>
        </div>

      </div>
    </PhoneShell>
  );
}