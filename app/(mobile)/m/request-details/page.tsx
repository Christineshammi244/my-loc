import Image from "next/image";
import { PhoneShell } from "@/components/mobile/phone-shell";
import { getVerificationRequestById } from "@/app/actions/propertyActions";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Props {
  params: {
    id: string; // المعرف القادم من الرابط الديناميكي URL
  };
}

export default async function RequestDetailsPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ id?: string }> 
}) {
  const { id } = await searchParams;
  const requestId = id;

  if (!requestId) return notFound();
  
  const result = await getVerificationRequestById(requestId);

  // التحقق من نجاح العملية ووجود البيانات
  if (!result.success||!result.data ||!result.data.property) {
    return notFound();
  }

  const verificationRequest = result.data;
  const { property, status, rejectedReason } = verificationRequest;

  // تحديد الصورة الأولى أو استخدام الصورة الافتراضية
  const propertyImage = property?.images?.[0]?.url || "https://placehold.co";

  // تنسيق السعر بالليرة السورية وفواصل الآلاف
  const formattedPrice = new Intl.NumberFormat("ar-SY", {
    style: "currency",
    currency: "SYP",
    maximumFractionDigits: 0
  }).format(Number(property?.price));

  return (
    <PhoneShell title="تفاصيل الطلب المرفوض">
      <article className="rounded-2xl bg-white p-3">
        <div className="relative h-44 overflow-hidden rounded-xl">
          <img 
          src="https://placehold.co"
          alt="صورة تجريبية"
          className="w-full h-full object-cover"
          />
        </div>
        <h3 className="mt-3 text-3xl font-extrabold">
          {property?.title} في {property?.region || property?.city  ||"الموقع المحدد"}
        </h3>
        <p className="text-3xl font-extrabold text-[#2d89c6]">{formattedPrice}</p>
      </article>

      <section className="rounded-2xl bg-white p-3">
        <h4 className="text-2xl font-bold text-red-600">
          حالة الطلب: {status === "rejected" ? "مرفوض" : status}
        </h4>
        <div className="mt-2 rounded-xl bg-slate-100 p-3 text-slate-700">
          {rejectedReason || "يتبين أن الملكية المقدمة غير مكتملة ولا تتطابق مع السجلات العقارية."}
        </div>
      </section>

      {/* روابط الانتقال والإجراءات */}
      <Link 
        href={`/add-property?edit=${property?.id}`} // بناءً على مجلد add-property الموجود لديك في الصورة
        className="block w-full text-center rounded-xl bg-[#24a2de] py-3 text-xl font-bold text-white transition hover:bg-[#1e8ec2]"
      >
        إعادة التقديم مع التعديلات
      </Link>
      
      <Link 
        href="/support"
        className="block w-full text-center rounded-xl border-2 border-[#24a2de] bg-white py-3 text-xl font-bold text-[#24a2de] transition hover:bg-slate-50"
      >
        تواصل مع الدعم الفني
      </Link>
    </PhoneShell>
  );
}