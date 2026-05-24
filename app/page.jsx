import { getProperties } from "@/app/actions/getProperties";

export default async function DisplayPropertiesPage({ searchParams }) {
  // جلب البيانات بناءً على الفلاتر (الباك إند اللي عملتيه)
  const properties = await getProperties(searchParams);

  return ( 
    <div className="max-w-6xl mx-auto p-8">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-800">قائمة العقارات</h1>
        <p className="text-gray-500">نتائج البحث والفلترة</p>
      </header>

      {/* التحقق من وجود بيانات */}
      {!properties || properties.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-600">لا يوجد عقارات تطابق بحثك حالياً.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="border rounded-xl p-4 shadow-md bg-white">
              <h2 className="text-xl font-semibold mb-2">{property.title}</h2>
              <p className="text-green-700 font-bold mb-2">
                {property.price.toLocaleString()} ل.س
              </p>
              <div className="text-sm text-gray-500 flex justify-between">
                <span>📍 {property.city}</span>
                <span>🏠 {property.category}</span>
              </div>
              <div className="mt-3 pt-3 border-t text-xs text-gray-400">
                عدد الغرف: {property.roomCount}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
