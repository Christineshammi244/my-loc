"use client";


import { useState } from "react";
import { createProperty } from "../actions/property";
export default function AddPropertyPage() {
  const [loading, setLoading] = useState(false);

  async function clientAction(formData) {
    setLoading(true);
    const result = createProperty(formData)
    setLoading(false);

    if (result.success) {
      alert("تمت إضافة العقار بنجاح! ✅");
    } else {
      alert("عذراً، حدث خطأ: " + result.error);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">إضافة عقار جديد</h1>
      
      <form action={clientAction} className="flex flex-col gap-4">
        {/* التسميات (Names) هنا يجب أن تطابق الـ formData.get في الأكشن */}
        
        <div>
          <label className="block mb-1 font-medium">عنوان العقار</label>
          <input name="title" type="text" required className="w-full border p-2 rounded" placeholder="مثلاً: شقة مطلة على البحر" />
        </div>

        <div>
          <label className="block mb-1 font-medium">الوصف</label>
          <textarea name="description" required className="w-full border p-2 rounded" placeholder="اكتب تفاصيل العقار هنا..." rows="4" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">السعر ($)</label>
            <input name="price" type="number" step="0.01" required className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">الموقع</label>
            <input name="location" type="text" required className="w-full border p-2 rounded" placeholder="المدينة، الشارع" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">نوع العقار</label>
            <input name="type" type="text" required className="w-full border p-2 rounded" placeholder="شقة، فيلا، مكتب" />
          </div>
          <div>
            <label className="block mb-1 font-medium">التصنيف</label>
            <input name="category" type="text" required className="w-full border p-2 rounded" placeholder="بيع، إيجار" />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className={`mt-4 p-3 rounded text-white font-bold transition ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? "جاري الإضافة..." : "نشر العقار الآن"}
        </button>
        </form>
    </div>
  );
  }