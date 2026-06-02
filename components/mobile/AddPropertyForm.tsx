"use client";
import Footer from "@/components/mobile/Footer";
import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Home,
  Layers,
  Store,
  Briefcase,
  MoreHorizontal,
  ChevronDown,
  Banknote,
  UploadCloud,
  Image as ImageIcon,
} from "lucide-react";

export default function AddPropertyForm() {
  // تحديد الخطوة الحالية (1 أو 2 أو 3)
  const [currentStep, setCurrentStep] = useState(1);

  // حفظ بيانات الفورم بالكامل لجميع الخطوات
  const [formData, setFormData] = useState({
    // بيانات الخطوة 1
    propertyType: "شقة",
    governorate: "",
    city: "",
    district: "",
    // بيانات الخطوة 2
    area: "",
    price: "",
    rooms: "1",
    bathrooms: "1",
    floor: "",
    description: "",
    // بيانات الخطوة 3
    acceptTerms: false,
  });

  const propertyTypes = [
    { id: "شقة", name: "شقة", icon: Building2 },
    { id: "فيلا", name: "فيلا", icon: Home },
    { id: "أرض", name: "أرض", icon: Layers },
    { id: "محل", name: "محل", icon: Store },
    { id: "مكتب", name: "مكتب", icon: Briefcase },
    { id: "آخر", name: "آخر", icon: MoreHorizontal },
  ];

  // حساب النسبة المئوية لخط التقدم
  const getProgressPercentage = () => {
    if (currentStep === 1) return "25%";
    if (currentStep === 2) return "60%";
    return "100%";
  };

  // دالة التعامل مع إرسال الفورم النهائي لشغل الباكند لاحقاً
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      alert("الرجاء الموافقة على الشروط والأحكام أولاً");
      return;
    }
    alert("تم إرسال بيانات العقار بنجاح! جاهز للربط مع الباكند 🚀");
    console.log("Data to backend:", formData);
  };

  return (
    <div
      className="max-w-xl mx-auto my-6 p-5 bg-white rounded-xl shadow-sm border border-gray-100"
      dir="rtl"
    >
      {/* الهيدر العلوي مع سهم الرجوع */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-50">
        <Link
          href="/"
          className="p-2 hover:bg-gray-50 rounded-full transition-colors"
        >
          <ArrowRight className="w-6 h-6 text-blue-600" />
        </Link>
        <h1 className="text-xl font-bold text-blue-600 text-center flex-grow">
          إضافة عقار جديد
        </h1>
        <div className="w-10"></div>
      </div>

      {/* مؤشر النسبة المئوية والتقدم */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1 text-xs font-semibold">
          <span className="text-yellow-600">الخطوة {currentStep} من 3</span>
          <span className="text-blue-600 font-bold">
            {getProgressPercentage()}
          </span>
        </div>
        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-full rounded-full transition-all duration-300"
            style={{ width: getProgressPercentage() }}
          ></div>
        </div>
        <h2 className="text-lg font-bold text-gray-800 mt-3">
          الموقع و نوع العقار
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        {/* ------------------ كود الخطوة 1 ------------------ */}

        <>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              اختر نوع العقار
            </label>
            <div className="grid grid-cols-3 gap-3">
              {propertyTypes.map((type) => {
                const IconComponent = type.icon;
                const isSelected = formData.propertyType === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, propertyType: type.id })
                    }
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                      isSelected
                        ? "border-blue-600 bg-blue-50/40 text-blue-600"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <IconComponent
                      className={`w-6 h-6 mb-2 ${isSelected ? "text-blue-600" : "text-gray-500"}`}
                    />
                    <span className="text-sm font-medium">{type.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                المحافظة
              </label>
              <div className="relative">
                <select
                  value={formData.governorate}
                  onChange={(e) =>
                    setFormData({ ...formData, governorate: e.target.value })
                  }
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 font-medium"
                >
                  <option value="">اختر المحافظة</option>
                  <option value="حمص">حمص</option>
                  <option value="دمشق">دمشق</option>
                  <option value="حلب">حلب</option>
                </select>
                <ChevronDown className="w-5 h-5 text-blue-600 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                المدينة / المنطقة الكبرى
              </label>
              <div className="relative">
                <select
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 font-medium"
                >
                  <option value="">اختر المدينة</option>
                  <option value="حمص المدينة">حمص المدينة</option>
                  <option value="المشرفة">المشرفة</option>
                </select>
                <ChevronDown className="w-5 h-5 text-blue-600 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الحي / المنطقة
              </label>
              <div className="relative">
                <select
                  value={formData.district}
                  onChange={(e) =>
                    setFormData({ ...formData, district: e.target.value })
                  }
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 font-medium"
                >
                  <option value="">اختر الحي</option>
                  <option value="الوعر">الوعر</option>
                  <option value="المحطة">المحطة</option>
                  <option value="الحمراء">الحمراء</option>
                </select>
                <ChevronDown className="w-5 h-5 text-blue-600 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="flex-1 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors text-center"
            >
              التالي
            </button>
            <button
              type="button"
              className="flex-1 p-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl font-bold transition-colors text-center"
            >
              إلغاء
            </button>
          </div>
        </>

        {/* ------------------ كود الخطوة 2 ------------------ */}

        <div className="border-b border-gray-100 pb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-6 bg-blue-600 rounded-full inline-block"></span>
            تفاصيل العقار
          </h2>

          <div className="space-y-5 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                المساحة (متر مربع)
              </label>
              <input
                type="number"
                placeholder="مثلا: 120 م²"
                value={formData.area}
                onChange={(e) =>
                  setFormData({ ...formData, area: e.target.value })
                }
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 font-medium placeholder-gray-400 text-right"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                السعر (ل.س)
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="إجمالي السعر"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 font-medium placeholder-gray-400 text-right pl-10"
                />
                <Banknote className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  عدد الغرف
                </label>
                <div className="relative">
                  <select
                    value={formData.rooms}
                    onChange={(e) =>
                      setFormData({ ...formData, rooms: e.target.value })
                    }
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 font-medium"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4+</option>
                  </select>
                  <ChevronDown className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  عدد الحمامات
                </label>
                <div className="relative">
                  <select
                    value={formData.bathrooms}
                    onChange={(e) =>
                      setFormData({ ...formData, bathrooms: e.target.value })
                    }
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 font-medium"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3+</option>
                  </select>
                  <ChevronDown className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                رقم الطابق
              </label>
              <input
                type="text"
                placeholder="مثلا: الطابق الثالث"
                value={formData.floor}
                onChange={(e) =>
                  setFormData({ ...formData, floor: e.target.value })
                }
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 font-medium placeholder-gray-400 text-right"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                وصف العقار
              </label>
              <textarea
                rows={4}
                placeholder="اكتب وصفاً تفصيلياً للعقار، المميزات، والخدمات القريبة..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 font-medium placeholder-gray-400 text-right resize-none"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="flex-1 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors text-center"
            >
              التالي
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="flex-1 p-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl font-bold transition-colors text-center"
            >
              السابق
            </button>
          </div>
        </div>

        {/* ------------------ كود الخطوة 3 (الجديد والأخير) ------------------ */}

        <>
          <div className="space-y-6 mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              أضف صوراً عالية الجودة لزيادة فرص بيع أو تأجير عقارك
            </label>

            {/* صندوق الرفع التفاعلي */}
            <div className="border-2 border-dashed border-blue-200 hover:border-blue-400 bg-blue-50/20 transition-colors rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer group text-center">
              <div className="p-3 bg-blue-50 group-hover:bg-blue-100 rounded-full transition-colors mb-3">
                <UploadCloud className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-sm font-bold text-gray-700 mb-1">رفع الصور</p>
              <p className="text-xs text-gray-400">
                يمكنك رفع حتى 10 صور (JPG, PNG)
              </p>
            </div>

            {/* تشكيلة بطاقات معاينة افتراضية لجمال التصميم أمام الدكاترة */}
            <div className="grid grid-cols-3 gap-3">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="aspect-video bg-gray-100 rounded-xl border border-gray-200 flex flex-col items-center justify-center text-gray-400"
                >
                  <ImageIcon className="w-5 h-5 mb-1" />
                  <span className="text-[10px]">صورة المعاينة {i}</span>
                </div>
              ))}
            </div>

            {/* خانة الاختيار والموافقة على الشروط */}
            <div className="flex items-start gap-3 pt-2">
              <input
                id="terms"
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={(e) =>
                  setFormData({ ...formData, acceptTerms: e.target.checked })
                }
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5 cursor-pointer"
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium text-gray-600 cursor-pointer select-none"
              >
                أوافق على الشروط والأحكام وسياسة الخصوصية الخاصة بموقع عقارك
                سوريا.
              </label>
            </div>
          </div>

          {/* أزرار التحكم الأخيرة */}
          <div className="flex gap-4 pt-4 border-t border-gray-100">
            <button
              type="submit"
              className={`flex-1 p-3 rounded-xl font-bold transition-colors text-center text-white ${
                formData.acceptTerms
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              إرسال المراجعة
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="flex-1 p-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl font-bold transition-colors text-center"
            >
              السابق
            </button>
          </div>
        </>
      </form>
      <Footer isHome={false} />
    </div>
  );
}
