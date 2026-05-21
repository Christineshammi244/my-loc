import Image from "next/image";
import { PhoneShell } from "@/components/mobile/phone-shell";
import { getMyPurchases } from "@/app/actions/propertyActions"; // تأكدي من مسار الملف الصحيح للأكشن

// رابط احتياطي في حال لم يجد السيرفر صورة للعقار في قاعدة البيانات
const fallbackPic = "https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12?auto=format&fit=crop&w=900&q=80";

export default async function MyPurchasesPage() {
  const result = await getMyPurchases();
  const purchases = result.data || [];

  return (
    <PhoneShell title="مشترياتي">
      {/* إذا كان جدول المشتريات فارغاً نعرض رسالة تنبيه */}
      {purchases.length === 0 && (
        <div className="text-center py-10 text-gray-500 text-xl">
          لا يوجد لديك أي مشتريات حالياً.
        </div>
      )}

      {/* عمل خريطة وتكرار العناصر بناءً على البيانات القادمة من السيرفر */}
      {purchases.map((purchase) => {
        // قراءة أول صورة من مصفوفة صور العقار إذا كانت موجودة
        const propertyImage = purchase.property?.images?.[0]?.url || fallbackPic;

        return (
          <article key={purchase.id} className="mb-3 overflow-hidden rounded-2xl bg-white">
            <div className="relative h-44">
              {/* استخدمنا وسم img العادي لضمان تجاوز مشاكل الـ remotePatterns المؤقتة */}
              <img 
                src={propertyImage} 
                alt={purchase.property?.title || "صورة العقار"} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="p-3">
              <h3 className="text-3xl font-extrabold">
                {purchase.property?.title || "شقة سكنية"}
              </h3>
              
              <p className="mt-1 text-2xl font-extrabold text-[#2e84d6]">
                {purchase.property?.price 
                  ?` ${Number(purchase.property.price).toLocaleString()} ل.س `
                  : "0 ل.س"}
              </p>

              <div className="mt-3 rounded-xl bg-emerald-50 p-2 text-sm text-emerald-800">
                حالة المراجعة: تمت الموافقة
              </div>

              <button className="mt-3 w-full rounded-xl bg-[#24a2de] py-2 text-lg font-bold text-white">
                تفاصيل العقد
              </button>
            </div>
          </article>
        );
      })}
    </PhoneShell>
  );
}