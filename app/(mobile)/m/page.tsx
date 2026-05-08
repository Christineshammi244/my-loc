import Link from "next/link";
import { PhoneShell } from "@/components/mobile/phone-shell";

const pages = [
  ["/m/comments", "التعليقات"],
  ["/m/my-comments", "تعليقاتي"],
  ["/m/purchase-success", "تم بنجاح"],
  ["/m/home", "الرئيسية"],
  ["/m/favorites", "المفضلة"],
  ["/m/profile", "تعديل الملف الشخصي"],
  ["/m/notifications", "الإشعارات"],
  ["/m/request-details", "تفاصيل الطلب"],
  ["/m/property-details", "تفاصيل العقار"],
  ["/m/sales-record", "سجل المبيعات"],
  ["/m/my-purchases", "مشترياتي"],
  ["/m/search-results", "نتائج البحث"],
  ["/m/search-cards", "بحث البطاقات"],
];

export default function MobileIndexPage() {
  return (
    <PhoneShell title="صفحات الموبايل">
      <div className="rounded-2xl bg-white p-4">
        <p className="mb-3 text-sm text-slate-500">روابط المعاينة</p>
        <div className="space-y-2">
          {pages.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="block rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </PhoneShell>
  );
}
