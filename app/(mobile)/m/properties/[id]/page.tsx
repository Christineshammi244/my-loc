// app/(mobile)/m/properties/[id]/page.tsx
import { getPropertyById } from "../../../../actions/propertyActions";
import { notFound } from "next/navigation";

interface PropertyProps {
  params: { id: string };
}

export default async function PropertyDetailsPage({ params }: PropertyProps) {
  // جلب البيانات مباشرة من الدالة التي أضفناها
  const property = await getPropertyById(params.id);

  // إذا لم يعثر على العقار في قاعدة البيانات يعرض صفحة 404
  if (!property) {
    notFound();
  }

  return (
    <div className="p-4 max-w-md mx-auto bg-white min-h-screen" dir="rtl">
      <h1 className="text-xl font-bold text-right mb-4 text-gray-800">تفاصيل الطلب المرفوض</h1>

      {/* كرت العقار - يجلب البيانات الحقيقية الآن */}
      <div className="bg-blue-50 p-4 rounded-xl mb-4 border border-blue-100">
        <h2 className="text-lg font-semibold text-gray-900 text-right">{property.title}</h2>
        <p className="text-blue-600 font-bold text-right mt-1">
          {Number(property.price).toLocaleString()} ل.س
        </p>
      </div>

      {/* صندوق حالة الطلب */}
      <div className="border border-red-200 bg-red-50/50 p-4 rounded-xl mb-6">
        <p className="text-red-600 font-bold text-right">حالة الطلب: مرفوض</p>
        <p className="text-gray-600 text-sm text-right mt-2 leading-relaxed">
          {property.description || "يتبين أن الملكية المقدمة غير مكتملة ولا تتطابق مع السجلات العقارية."}
        </p>
      </div>

      {/* الأزرار */}
      <div className="space-y-3">
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-xl transition-colors">
          إعادة التقديم مع التعديلات
        </button>
        <button className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-xl transition-colors">
          تواصل مع الدعم الفني
        </button>
      </div>
    </div>
  );
}