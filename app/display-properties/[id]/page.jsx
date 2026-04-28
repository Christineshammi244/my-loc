export default async function PropertyDetails({ params }) {
  const { id } = await params;
  const res = await fetch(`http://localhost:3000/api/properties/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="text-center p-20">
        العقار غير موجود أو الرابط خطأ (404)
      </div>
    );
  }

  const property = await res.json();

  return (
    <div className="max-w-4xl mx-auto p-10" dir="rtl">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        {property.title}
      </h1>
      <div className="bg-white shadow-xl rounded-2xl p-8 border">
        <p className="text-2xl font-semibold mb-4 text-green-600">
          {property.price} ل.س
        </p>
        <p className="text-gray-600 mb-6 leading-relaxed text-lg">
          {property.description}
        </p>
        <div className="flex gap-4">
          <span className="bg-gray-100 px-4 py-2 rounded-lg">
            📍 {property.location}
          </span>
          <span className="bg-gray-100 px-4 py-2 rounded-lg">
            🏠 {property.type}
          </span>
        </div>
      </div>
    </div>
  );
}
