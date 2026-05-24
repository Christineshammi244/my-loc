import Image from "next/image";
import Link from "next/link"; // استدعاء للتنقل الآمن بين الصفحات
import { PhoneShell } from "@/components/mobile/phone-shell";
import { getProperties } from "@/app/actions/propertyActions"; // استدعاء دالة جلب العقارات للرئيسية

export default async function HomeMobilePage() {
  // 1. جلب العقارات الحقيقية من قاعدة البيانات (مع تمرير بارامترات فارغة كبداية لجلب الكل)
  const properties = await getProperties({});
  
  // رابط صورة احتياطية في حال لم يرفع المستخدم صوراً للعقار
  const defaultPic = "https://unsplash.com";

  return (
    <PhoneShell title="الرئيسية">
      {/* 2. ترحيب المستخدم الثابت الخاص بكِ */}
      <div className="className= rounded-2xl bg-[#1ea0df] p-4 text-white mb-4">
        <p className="text-xl font-bold">أهلاً بك مجدداً، أحمد 👋</p>
        <p className="text-sm text-white/90">مدير عقاري • عضو عام في النظام</p>
      </div>

      {/* 3. قسم البحث المتقدم وتفعيل الزر بالرابط الصحيح */}
      <section className="rounded-2xl bg-white p-3 mb-4">
        <h3 className="mb-2 text-center text-lg font-bold">البحث المتقدم</h3>
        <div className="relative h-52 overflow-hidden rounded-xl">
          <Image src={defaultPic} alt="hero" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/35" />
          <Link 
            href="/m/search-results" 
            className="absolute bottom-3 left-3 right-3 rounded-xl bg-[#1ea0df] py-3 text-center text-white font-bold text-sm transition hover:bg-[#1ea0df]/90 flex items-center justify-center"
          >
            ابدأ البحث
          </Link>
        </div>
      </section>

      {/* 4. عرض العقارات الحقيقية من قاعدة البيانات ديناميكياً بنفس التنسيق */}
      <section className="rounded-2xl bg-white p-3">
        <h3 className="mb-3 text-right text-lg font-bold">أحدث العقارات المضافة</h3>
        
        {properties?.map((property) => (
          <article key={property.id} className="mb-3 rounded-xl border border-slate-100 p-2">
            <div className="relative h-40 overflow-hidden rounded-lg">
              <Image 
                src={property.images?.[0]?.url || defaultPic} 
                alt={property.title} 
                fill 
                className="object-cover" 
              />
            </div>
            <div className="mt-2 text-right">
              <h4 className="font-bold text-lg text-slate-800">{property.title}</h4>
              <p className="text-xs text-slate-500">{property.city} • {property.location}</p>
              <p className="text-xl font-black text-[#1ea0df] mt-1">
                {property.price?.toLocaleString("ar-SY")} ل.س
              </p>
            </div>
          </article>
        ))}

        {properties?.length === 0 && (
          <p className="text-center text-slate-400 p-4">لا توجد عقارات مضافة حالياً.</p>
        )}
      </section>
    </PhoneShell>
  );
}