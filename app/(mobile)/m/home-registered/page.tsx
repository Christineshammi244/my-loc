"use client";
import React, { useState, useEffect } from "react";
import HeaderRegister from "@/components/mobile/HeaderRegister";
import WelcomeBanner from "@/components/mobile/WelcomeBanner";
import AdvancedSearch from "@/components/mobile/AdvancedSearch";
import PropertyCardRegister from "@/components/mobile/PropertyCardRegister";
import Footer from "@/components/mobile/Footer";
import SidebarRegister from "@/components/mobile/SidebarRegister";

// استيراد الأكشن الخاص بالباك إند لجلب البيانات الحقيقية من قاعدة البيانات
import { getProperties, PropertyParams } from "@/app/actions/propertyActions";

// تعريف نوع كائن العقار القادم من الباك إند لمنع أخطاء التايب سكريبت
interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  location: string;
  type: string;
  category: string;
  status: string;
  area: number | null; // عدلناها إلى number | null لتطابق الـ Float? في السكيما تماماً
  city?: string;
  floor?: string;
  region?: string;
  
  // 1. إضافة علاقة الصور
  images?: {
    id: number;
    url: string;
    propertyId: number;
  }[];

  // 2. إضافة علاقة التعليقات المفقودة
  comments?: {
    id: number;
    content: string;
    createdAt: Date;
    propertyId: number;
    userId: string;
  }[];

  // 3. إضافة علاقة المفضلة (القلب) المفقودة

}

export default function HomePage({ userName }: { userName:string }) {
  // استخدام حالة ديناميكية بدلاً من المصفوفة الوهمية القديمة
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // حالة التحميل لحين جلب البيانات
  

  // جلب البيانات من الباك إند فور تحميل الصفحة
  useEffect(() => {
  async function loadProperties() {
  setLoading(true);
  try {
    // 1. الدالة الآن تعود بالمصفوفة مباشرة ككائنات صريحة
    const properties = await getProperties({});
    
    // 2. التحقق من أن النتيجة مصفوفة حقيقية وليست فارغة
    if (properties && properties.length > 0) {
      setFeaturedProperties(properties);
    } else {
      console.error("لم يتم العثور على عقارات أو المصفوفة فارغة");
    }
  } catch (error) {
    console.error("فشل في جلب البيانات:", error);
  } finally {
    setLoading(false);
  }
} loadProperties();
  } ,[]);
  return (
    // محاذاة وتنسيق الحاوية لتشبه شاشات الجوال المتجاوبة (Mobile-First) كما هي بكودكِ الأصلي
    <div
      className="w-full max-width-[480px] min-h-screen bg-gray-50/50 mx-auto font-sans antialiased pb-2"
      dir="rtl"
    >
      <div className="bg-white max-w-md mx-auto min-h-screen shadow-md flex flex-col">
        {/* شريط التنقل العلوي */}
        <HeaderRegister onMenuClick={() => setIsSidebarOpen(true)} />

  
        <WelcomeBanner userName={userName} />

      
        <AdvancedSearch />

        
        <div className="flex items-center justify-between px-4 mt-5 mb-1">
          <h2 className="text-base font-bold text-gray-900">عقارات</h2>
          <a
            href="#"
            className="text-xs text-[#00b4db] font-medium hover:underline flex items-center"
          >
          
          </a>
        </div>

        {/* قائمة العقارات المميزة الديناميكية القادمة من قاعدة البيانات */}
        <div className="flex flex-col">
          {loading ? (
            <p className="text-center py-10 text-sm text-gray-500">جاري تحميل العقارات...</p>
          ) : featuredProperties.length > 0 ? (
          featuredProperties.map((property) => (
  <PropertyCardRegister
    key={property.id}
    title={property.title} 
    price={property.price.toString()} 
    location={property.location}
    imageUrl={property.images && property.images.length > 0 ? property.images[0].url : "/photo_2026-05-23_20-40-28.jpg"}
    beds={property.bedrooms}
    baths={property.bathrooms}
    area={property.area ?? 0}
    commentsCount={property.comments?.length || 0}
    
  />
))
          ) : (
            <p className="text-center py-10 text-sm text-gray-500">لا توجد عقارات متاحة حالياً.</p>
          )}
        </div>
        
        <SidebarRegister
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* تذييل الصفحة */}
        <Footer />
      </div>
    </div>
  );
}











