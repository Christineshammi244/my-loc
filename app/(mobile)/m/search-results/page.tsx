import Image from "next/image";
import { Search } from "lucide-react";
import { PhoneShell } from "@/components/mobile/phone-shell";
import { searchProperties } from "@/app/actions/propertyActions"; // استدعاء دالة البحث الخلفية

// الـ pic الافتراضية في حال لم يرفع المستخدم صورة للعقار


interface SearchProps {
  searchParams: Promise<{ q?: string; type?: string }>}
  
export default async function SearchResultsPage({ searchParams }: SearchProps) {
  // قراءة متغيرات البحث من رابط المتصفح المتوافقة مع Next.js 15
  const params = await searchParams;
  const currentQuery = params.q || "";
  const currentType = params.type || "الكل";
  // جلب العقارات الحقيقية المطابقة للفلاتر من الباك إيند
  const result = await searchProperties({ query: currentQuery, type: currentType });
const properties = result.success ? result.data : [];

  return (
    <PhoneShell title={currentQuery ?` نتائج البحث - ${currentQuery}` : "نتائج البحث"}>
      <div className="rounded-2xl bg-white p-2">
        {/* نموذج البحث (Form) لإرسال الكلمة الدلالية للرابط تلقائياً */}
        <form method="GET" className="relative">
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Search className="h-5 w-5" />
          </button>
          <input
            type="search"
            name="q"
            defaultValue={currentQuery}
            placeholder="ابحث عن مدينة، حي، أو نوع العقار"
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pr-10 pl-3 text-sm outline-none ring-[#2e84d6]/30 placeholder:text-slate-400 focus:bg-white focus:ring-2"
          />
          {/* الحفاظ على التبويب الحالي أثناء البحث النصي */}
          <input type="hidden" name="type" value={currentType} />
        </form>

        {/* أزرار الفلترة حسب النوع (التبويبات) */}
        <div className="mt-2 flex flex-wrap gap-2 text-sm">
          {["الكل", "تجاري", "فلل", "شقق"].map((tab) => {
  const isActive = currentType === tab;
  const queryUrl = `?type=${encodeURIComponent(tab)}${currentQuery ? `&q=${encodeURIComponent(currentQuery)}`: ""}`;
            return (
              <a
                key={tab}
                href={queryUrl}
                className={`min-h-10 rounded-full px-4 font-semibold transition flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e84d6]/40 ${
                  isActive
                    ? "bg-[#2e84d6] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab === "شقة" ? "شقق" : tab === "فيلا" ? "فلل" : tab}
                </a>
            );
          })}
          </div>
                    <div className="rounded-xl bg-white px-3 py-2 text-sm text-slate-500">
        تم العثور على {properties?.length || 0} عقار مطابق
      </div>

      {properties?.map((property) =>  (
        <article key={property.id} className="rounded-2xl bg-white p-3 max-w-4xl mx-auto w-full mt-4 shadow-sm">
          <div className="relative h-44 overflow-hidden rounded-xl">
            <Image 
              src={(property.images && property.images[0]?.url) || "/placeholder.png"} 
              alt={property.title} 
              fill 
              className="object-cover" 
            />
          </div>
          <div className="p-2">
            <h3 className="text-3xl font-extrabold">{property.title}</h3>
            <p className="text-4xl font-extrabold text-slate-900">
              {property.price.toLocaleString("ar-SY")} $
            </p>
            <p className="text-sm text-slate-500 mt-1">{property.location}</p>
            
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button className="min-h-11 rounded-lg bg-[#24a2de] py-2 font-bold text-white transition hover:bg-[#1f95cc]">
                اتصال
              </button>
              <button className="min-h-11 rounded-lg bg-emerald-600 py-2 font-bold text-white transition hover:bg-emerald-700">
                واتساب
              </button>
            </div>
          </div>
        </article>
      ))}
      </div>
      {properties?.length === 0 && (
        <p className="text-center text-slate-400 p-8 bg-white rounded-2xl">لا توجد عقارات مطابقة لخيارات البحث حالياً.</p>
      )}
  </PhoneShell>
  );
}
  