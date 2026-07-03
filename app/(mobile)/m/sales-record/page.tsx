export const dynamic ="force-dynamic";
import Image from "next/image";
import { PhoneShell } from "@/components/mobile/phone-shell";
import { getSalesRecord } from "@/app/actions/propertyActions";

export default async function SalesRecordPage() {
  // جلب البيانات الحقيقية من قاعدة البيانات عبر الأكشن
  const sales = await getSalesRecord();

  const defaultImg = "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80";

  return (
    <PhoneShell title="سجل المبيعات">
      {/* أزرار التصفية العلوية الثابتة مع تصحيح خطأ الكلاس النصي تماماً */}
      <div className="mb-2 flex gap-2 text-sm justify-end">
        {["مرفوض", "معلق", "مكتمل", "الكل"].map((x, i) => (
          <span
            key={x}
            className={`rounded-lg px-3 py-1 ${i === 3 ? "bg-[#2e84d6] text-white" : "bg-white text-slate-600"}`}
          >
            {x}
          </span>
        ))}
      </div>

      {/* عرض المبيعات الحقيقية ديناميكياً بناءً على السكيما */}
      <div className="space-y-3">
        {sales.map((property) => {
          const mainImage = property.images?.[0]?.url || defaultImg;
          
          return (
            <article key={property.id} className="rounded-2xl bg-white p-3 border border-slate-100">
              <div className="flex items-center gap-3 justify-between flex-row-reverse text-right">
                <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-slate-50">
                  <Image src={mainImage} alt={property.title} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">رقم العملية SALE-{property.id}</p>
                  <h3 className="text-lg font-extrabold text-slate-800 mt-0.5">{property.title}</h3>
                  <p className="text-md font-extrabold text-[#2e84d6] mt-1">
                    {property.price.toLocaleString()} ل.س
                  </p>
                </div>
              </div>
            </article>
          );
        })}

        {/* رسالة توضيحية في حال كانت قاعدة البيانات فارغة */}
        {sales.length === 0 && (
          <p className="text-center text-slate-400 py-12">لا توجد عمليات بيع مسجلة حالياً.</p>
        )}
      </div>
    </PhoneShell>
  );
}