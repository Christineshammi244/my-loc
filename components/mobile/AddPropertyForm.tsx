"use client";
import Footer from "@/components/mobile/Footer";

import Link from "next/link";
import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { createPropertyComplete } from "@/app/actions/propertyActions";
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
  Info,
} from "lucide-react";

export default function AddPropertyForm() {
  const [selectedFiles, setSelectedFiles] = useState<File []>([]);
const[loading, setLoading] = useState(false);
const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    propertyType: "شقة",
    governorate: "",
    city: "",
    district: "",
    area: "",
    price: "",
    rooms: "1",
    bathrooms: "1",
    floor: "",
    description: "",
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

  const handleFinalSubmit = async () => {
  alert("تمت إرسال الطلب بنجاح للباك إند");
  setLoading(true);
  try {
    setLoading(true);
    const data = new FormData();
    
    // 1. بيانات العقار النصية كالمعتاد
    data.append("category", formData.propertyType);
    data.append("governorate", formData.governorate);
    data.append("city", formData.city);
    data.append("region", formData.district);
    data.append("area", formData.area);
    data.append("price", formData.price);
    data.append("rooms", formData.rooms);
    data.append("bathrooms", formData.bathrooms);
    data.append("floor", formData.floor);
    data.append("description", formData.description);

    selectedFiles.forEach((file) => {
      data.append("images", file); 
    });

    const response = await createPropertyComplete(data);
      console.log("=== 🚀 بدأت دالة الأكشن بالعمل على السيرفر ===");
    setLoading(false);

    if (response && response.success) {
      localStorage.removeItem("savedFormData");
      
      alert("تم إضافة العقار وحفظ الصور بنجاح!");
      
      window.location.reload();
    } else {
      alert(response?.error || "حدث خطأ أثناء حفظ العقار");
    }
  } catch (error: any) {
    console.error("❌ Prisma Database Error:", error);
    
    return { 
      success: false, 
      error: error?.message || "فشلت عملية الحفظ داخل قاعدة البيانات" 
    };
  }
}
useEffect(()=>{
  const savedData = localStorage.getItem("savedFormData");
  if(savedData){
    setFormData(JSON.parse(savedData));
  }},[]);
useEffect(()=>{
  if (formData&& Object.keys(formData).length>0) {
    localStorage.setItem("savedFormData", JSON.stringify(formData));
  }
},[formData]);
  return (
    <div
      className="max-w-xl mx-auto bg-white min-h-screen flex flex-col justify-between"
      dir="rtl"
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-100 sticky top-0 bg-white z-50">
        <Link
          href="/"
          className="p-1 hover:bg-gray-50 rounded-full transition-colors"
        >
          <ArrowRight className="w-6 h-6 text-[#0091dc]" />
        </Link>
        <h1 className="text-lg font-bold text-[#0091dc] text-center flex-grow pl-6">
          إضافة عقار جديد
        </h1>
      </div>

      <form onSubmit={handleFinalSubmit} className="p-5 space-y-10 flex-grow">
        <div className="space-y-5">
          <span className="text-xs font-semibold text-amber-500">
            الخطوة 1 من 3{" "}
          </span>
          <div className="flex justify-between items-baseline">
            <h2 className="text-base font-bold text-gray-900">
              الموقع و نوع العقار
            </h2>

            <span className="text-[#0091dc] font-bold mr-1">25%</span>
          </div>
          <div className="w-full bg-gray-150 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#0091dc] h-full w-[25%] rounded-full"></div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2">
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
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                      isSelected
                        ? "border-[#0091dc] bg-blue-50/20 text-[#0091dc]"
                        : "border-gray-200 bg-white text-gray-600"
                    }`}
                  >
                    <IconComponent
                      className={`w-5 h-5 mb-1.5 ${isSelected ? "text-[#0091dc]" : "text-gray-400"}`}
                    />
                    <span className="text-xs font-medium">{type.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                المحافظة
              </label>
              <div className="relative">
                <input
        type="text"
        list="governorates-list" // ربط الحقل بالقائمة بالأسفل
        placeholder="اختر أو اكتب اسم المحافظة..."
        value={formData.governorate || ""}
        onChange={(e) =>
          setFormData({ ...formData, governorate: e.target.value })
        }
        className="text-right w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#0091dc] text-sm"
      />
      <datalist id="governorates-list">
        <option value="حمص" />
        <option value="دمشق" />
        <option value="اللاذقية" />
        <option value="حلب" />
        <option value="طرطوس" />
      </datalist>
                <ChevronDown className="w-4 h-4 text-[#0091dc] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                المدينة / المنطقة الكبرى
              </label>
              <div className="relative">
                <input
        type="text"
        list="cities-list"
        placeholder="اختر أو اكتب اسم المدينة..."
        value={formData.city || ""}
        onChange={(e) => 
          setFormData({ ...formData, city: e.target.value })
        }
        className="text-right w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#0091dc] text-sm"
      />
      <datalist id="cities-list">
        <option value="حمص المدينة" />
        <option value="المشرفة" />
        <option value="الميدان" />
        <option value="المزة" />
      </datalist>
                <ChevronDown className="w-4 h-4 text-[#0091dc] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                الحي / المنطقة
              </label>
              <div className="relative">
              <input
        type="text"
        list="districts-list"
        placeholder="اختر أو اكتب اسم الحي..."
        value={formData.district || ""}
        onChange={(e) => 
          setFormData({ ...formData, district: e.target.value })
        }
        className="text-right w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#0091dc] text-sm"
      />
      <datalist id="districts-list">
        <option value="الإنشاءات" />
        <option value="الغوطة" />
        <option value="الحمراء" />
        <option value="كفرسوسة" />
      </datalist>
                <ChevronDown className="w-4 h-4 text-[#0091dc] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5 pt-4">
          <span className="text-xs font-semibold text-amber-500">
            الخطوة 2 من 3{" "}
          </span>
          <div className="flex justify-between items-baseline">
            <h2 className="text-base font-bold text-gray-900">تفاصيل العقار</h2>

            <span className="text-[#0091dc] font-bold mr-1">50%</span>
          </div>
          <div className="w-full bg-gray-150 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#0091dc] h-full w-[50%] rounded-full"></div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                المساحة (متر مربع)
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="مثلا: 120 م²"
                  value={formData.area}
                  onChange={(e) =>
                    setFormData({ ...formData, area: e.target.value })
                  }
                  className="text-right w-full p-3 bg-white border border-gray-400 rounded-xl focus:outline-none focus:border-[#0091dc] text-sm text-center placeholder-gray-300 font-medium"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                السعر (ل.س)
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="إجمالي السعر"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="text-right w-full p-3 bg-white border border-gray-500 rounded-xl focus:outline-none focus:border-[#0091dc] text-sm text-center placeholder-gray-300 font-medium"
                />
                <Banknote className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  عدد الغرف
                </label>
                <div className="relative">
                  <select
                    value={formData.rooms}
                    onChange={(e) =>
                      setFormData({ ...formData, rooms: e.target.value })
                    }
                    className="text-right w-full p-3 bg-white border border-gray-200 rounded-xl appearance-none focus:outline-none focus:border-[#0091dc] text-sm text-center font-medium text-gray-600"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                  <ChevronDown className="text-right w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  عدد الحمامات
                </label>
                <div className="relative">
                  <select
                    value={formData.bathrooms}
                    onChange={(e) =>
                      setFormData({ ...formData, bathrooms: e.target.value })
                    }
                    className="text-right w-full p-3 bg-white border border-gray-200 rounded-xl appearance-none focus:outline-none focus:border-[#0091dc] text-sm text-center font-medium text-gray-600"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                رقم الطابق
              </label>
              <input
                type="text"
                placeholder="مثلاً: الطابق الثالث"
                value={formData.floor}
                onChange={(e) =>
                  setFormData({ ...formData, floor: e.target.value })
                }
                className="text-right w-full p-3 bg-white border border-gray-500 rounded-xl focus:outline-none focus:border-[#0091dc] text-sm text-center placeholder-gray-300 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                وصف العقار
              </label>
              <textarea
                rows={4}
                placeholder="اكتب وصفاً تفصيلياً للعقار، المميزات، والخدمات القريبة..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#0091dc] text-sm text-right placeholder-gray-300 font-medium resize-none"
              />
            </div>
          </div>
        </div>

        <div className="space-y-5 pt-4">
          <span className="text-xs font-semibold text-amber-500">
            الخطوة 3 من 3{" "}
          </span>
          <div className="flex justify-between items-baseline">
            <h2 className="text-base font-bold text-gray-900">صور العقار</h2>

            <span className="text-[#0091dc] font-bold mr-1">75%</span>
          </div>
          <div className="w-full bg-gray-150 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#0091dc] h-full w-[75%] rounded-full"></div>
          </div>

          <div className="border-2 border-dashed border-blue-200 bg-blue-50/10 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer text-center">
            <UploadCloud className="w-8 h-8 text-[#0091dc] mb-2" />
            <p className="text-sm font-bold text-gray-800">رفع الصور</p>
            <p className="text-[11px] text-gray-400 mb-3">
              يمكنك رفع حتى 10 صور (JPG, PNG)
            </p>
            <button
              type="button"
              className="bg-[#0091dc] text-white text-xs font-bold px-5 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={()=>fileInputRef.current?.click()}
            >
              اختر الصور
            </button>
            <input
      type="file"
      multiple
      accept="image/*"
      ref={fileInputRef}
      className="hidden"
      onChange={(e) => {
        if (e.target.files) {
          const filesArray = Array.from(e.target.files);
          setSelectedFiles((prev)=>[...prev,...filesArray]);
        }
      }}
    />
    {selectedFiles.length>0 &&(
      <div className="grid grid-cols-3 gap-2 mt-4 w-full px-4">
        {selectedFiles.map((file, index) => (
          <div key={index} className="relative aspect-square border rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center text-[10px] text-gray-500">
            <img 
              src={URL.createObjectURL(file)} 
              alt={`صورة ${index + 1}`} 
              className="object-cover w-full h-full"
            />
            <button
              type="button"
              onClick={() => setSelectedFiles(selectedFiles.filter((_, i) => i !== index))}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center font-bold text-[8px]"
            >
              X
            </button>
          </div>
        ))}
      </div>
    )}


          </div>


          <div className="bg-blue-50/40 border border-blue-100 rounded-xl p-3 flex items-start gap-2.5 text-xs text-blue-800 font-medium">
            <Info className="w-4 h-4 text-[#0091dc] shrink-0 mt-0.5" />
            <p>
              سيتم مراجعة طلبك من قبل فريق الإدارة قبل نشره للعامة. تستغرق
              العملية عادةً أقل من 24 ساعة.
            </p>
          </div>

          <div className="flex items-center gap-2.5 pt-2">
            <input
              id="terms"
              type="checkbox"
              checked={formData.acceptTerms}
              onChange={(e) =>
                setFormData({ ...formData, acceptTerms: e.target.checked })
              }
              className="w-4 h-4 text-[#0091dc] border-gray-300 rounded focus:ring-[#0091dc] cursor-pointer"
            />
            <label
              htmlFor="terms"
              className="text-xs font-bold text-gray-600 cursor-pointer select-none"
            >
              أوافق على{" "}
              <span className="text-amber-500 underline">الشروط والأحكام</span>{" "}
              وسياسة الخصوصية الخاصة بموقع عقارك سوريا.
            </label>
          </div>
        </div>

        <div className="flex gap-4 pt-6 border-t border-gray-100">
          <button
            type="button"
            className="flex-1 p-3 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-xl font-bold text-sm transition-colors text-center"
          >
            إلغاء
          </button>
          <button 
          type="button"
  onClick={handleFinalSubmit}
  disabled={loading}

  className="flex-1 p-3 bg-[#0091dc] hover:bg-blue-600 text-white rounded" 
>
  {loading ? "جاري الرفع والحفظ..." : "إرسال المراجعة"}
</button>
        </div>
      </form>

      <Footer isHome={false} />
    </div>
  );
}
