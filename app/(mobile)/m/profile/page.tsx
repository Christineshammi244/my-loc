import { PhoneShell } from "@/components/mobile/phone-shell";
import { getUserProfile } from "@/app/actions/user";
import Image from "next/image";
export default async function ProfilePage() {
  // 1. جلب بيانات المستخدم الحقيقية من قاعدة البيانات
  const user = await getUserProfile();

  // صورة افتراضية في حال عدم وجود صورة شخصية في الحساب
  const defaultAvatar = "https://unsplash.com";

  return (
    <PhoneShell title="الملف الشخصي">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        {/* قسم الصورة الشخصية المنسق من قبلكِ */}
        <div className="flex flex-col items-center border-b border-slate-100 pb-6">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-[#1ea0df]">
            <Image
              src={user?.image || defaultAvatar}
              alt="profile"
            
              className="h-full w-full object-cover"
            />
          </div>
          {/* عرض الاسم الحقيقي للمستخدم من السكيما */}
          <h2 className="mt-3 text-2xl font-black text-slate-800">
            {user?.name || "مستخدم نظامي"}
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">عضو مسجل في المنصة</p>
        </div>

        {/* قسم تفاصيل البيانات الحقيقية */}
        <div className="mt-6 space-y-4 text-right">
          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1">البريد الإلكتروني</label>
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

        {/* أزرار التحكم والعمليات الثابتة الخاصة بتنسيقكِ */}
        <div className="mt-8 space-y-3">
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