import Image from "next/image";
import { PhoneShell } from "@/components/mobile/phone-shell";
import { getWishlist } from "@/app/actions/wishList"; // استدعاء دالة جلب المفضلة الحقيقية

export default async function FavoritesPage() {
  // 1. جلب العقارات المفضلة الحقيقية المخزنة بقاعدة البيانات للمستخدم الحالي
  const properties = await getWishlist();
  
  // رابط صورة احتياطية في حال لم يرفع المستخدم صوراً للعقار
  const defaultPic = "https://cloudinary.com";

  return (
    <PhoneShell title="عقاراتي المفضلة">
      <div className="rounded-2xl bg-white p-4">
        <div className="mb-2 flex justify-end gap-5 px-2 text-lg font-bold">
          <button>قائمة</button>
          <button className="text-slate-400">شبكة</button>
        </div>

      
        {properties?.map((property) => (
          <article key={property.id} className="rounded-2xl bg-white p-3 mb-3 border border-slate-100">
            <div className="relative mb-3 h-36 overflow-hidden rounded-xl">
              <Image 
                src={property.images?.[0]?.url || defaultPic} 
                alt={property.title || "fav"} 
                fill 
                className="object-cover" 
              />
            </div>
            {/* جلب اسم المدينة والمنطقة من حقول السكيما الحقيقية */}
            <p className="text-sm text-[#2e84d6] text-right">
              {property.city}، {property.location}
            </p>
            <h3 className="text-3xl font-extrabold text-right mt-1">{property.title}</h3>
            {/* عرض السعر الحقيقي بصيغة رقمية منسقة */}
            <p className="text-4xl font-extrabold text-amber-600 text-right mt-1">
              {property.price?.toLocaleString("ar-SY")} ل.س
            </p>
            <button className="mt-3 w-full rounded-xl border border-red-100 py-2 text-center text-red-500 font-semibold transition hover:bg-red-50">
              إزالة من المفضلة
            </button>
          </article>
        ))}

        {/* رسالة توضيحية في حال كانت المفضلة فارغة */}
        {properties?.length === 0 && (
          <p className="text-center text-slate-400 p-8">لم تقم بإضافة أي عقارات للمفضلة بعد.</p>
        )}
      </div>
    </PhoneShell>
  );
}