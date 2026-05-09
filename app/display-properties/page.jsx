import prisma from "@/lib/prisma";

export default async function DisplayPropertiesPage() {
  // جلب المعاملات من قاعدة البيانات مع بيانات العقار والشخص المرتبط بها
  const transactions = await prisma.transaction.findMany({
    include: {
      property: true, // لجلب اسم العقار وسعره
      user: true, // لجلب اسم الشخص الذي قام بالمعاملة
    },
    orderBy: {
      createdAt: "desc", // عرض الأحدث دائماً في الأعلى
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-8">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-extrabold text-gray-800">سجل المعاملات</h1>
        <p className="text-gray-500">
          عرض جميع المعاملات المالية الموثقة في النظام
        </p>
      </header>

      {transactions.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg border-2 border-dashed">
          <p className="text-gray-400">لا توجد معاملات مسجلة حالياً.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {transactions.map((trx) => (
            <div
              key={trx.id}
              className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-mono bg-blue-50 text-blue-600 px-2 py-1 rounded">
                    {trx.reference}
                  </span>
                  <h2 className="text-xl font-bold mt-2 text-gray-800">
                    {trx.property?.title || "عقار غير معروف"}
                  </h2>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-green-600">
                    ${trx.amount.toLocaleString()}
                  </p>
                  <span className="text-sm text-gray-400">
                    {new Date(trx.createdAt).toLocaleDateString("ar-EG")}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t pt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                    👤
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">بواسطة</p>
                    <p className="font-medium text-gray-700">
                      {trx.user?.name || "مستخدم مجهول"}
                    </p>
                  </div>
                </div>

                <div
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    trx.status === "COMPLETED"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {trx.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
