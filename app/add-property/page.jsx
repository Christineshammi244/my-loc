"use client";

import { useState, useRef } from "react"; // أضفنا useRef لمسح النموذج
import { createProperty } from "../actions/property";

export default function AddPropertyPage() {
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null); // مرجع للوصول للنموذج ومسحه

  async function clientAction(formData) {
    setLoading(true);

    try {
      // الـ await ضرورية هنا لاستلام النتيجة من السيرفر
      const result = await createProperty(formData);

      if (result?.success) {
        alert("تمت إضافة العقار بنجاح! ✅");
        formRef.current?.reset(); // مسح الحقول بعد النجاح
      } else {
        alert("عذراً، حدث خطأ: " + (result?.error || "خطأ غير معروف"));
      }
    } catch (err) {
      alert("حدث خطأ تقني أثناء الإرسال");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        إضافة عقار جديد
      </h1>

      <form ref={formRef} action={clientAction} className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            عنوان العقار
          </label>
          <input
            name="title"
            type="text"
            required
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="مثلاً: شقة مطلة على البحر"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">الوصف</label>
          <textarea
            name="description"
            required
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="اكتب تفاصيل العقار هنا..."
            rows="4"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              السعر ($)
            </label>
            <input
              name="price"
              type="number"
              step="0.01"
              required
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              الموقع
            </label>
            <input
              name="location"
              type="text"
              required
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="المدينة، الشارع"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              نوع العقار
            </label>
            <input
              name="type"
              type="text"
              required
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="شقة، فيلا، مكتب"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              التصنيف
            </label>
            <input
              name="category"
              type="text"
              required
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="بيع، إيجار"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`mt-4 p-3 rounded text-white font-bold transition-all ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 active:scale-95"
          }`}
        >
          {loading ? "جاري الإضافة..." : "نشر العقار الآن"}
        </button>
      </form>
    </div>
  );
}
