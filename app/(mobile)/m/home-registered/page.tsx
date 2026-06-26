"use client";
import React, { useState } from "react";
import HeaderRegister from "@/components/mobile/HeaderRegister";
import WelcomeBanner from "@/components/mobile/WelcomeBanner";
import AdvancedSearch from "@/components/mobile/AdvancedSearch";
import PropertyCardRegister from "@/components/mobile/PropertyCardRegister";
import Footer from "@/components/mobile/Footer";
import SidebarRegister from "@/components/mobile/SidebarRegister";

export default function HomePage() {
  // محاكاة بيانات العقارات المميزة المأخوذة من واجهتك بالتفصيل
  const featuredProperties = [
    {
      id: 1,
      title: "فيلا مودرن - يعفور",
      price: "2.4 مليار ل.س",
      location: "ريف دمشق، يعفور، البوابة الرئيسية",
      imageUrl:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600",
      beds: 4,
      baths: 3,
      area: 350,
      commentsCount: 2,
      isFavorite: true, // ممتلئ باللون الأحمر بالصورة
    },
    {
      id: 2,
      title: "شقة مفروشة - المالكي",
      price: "2.4 مليار ل.س",
      location: "دمشق، حي المالكي، مقابل الحديقة",
      imageUrl:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600",
      beds: 3,
      baths: 2,
      area: 180,
      commentsCount: 1,
      isFavorite: false, // غير ممتلئ بالصورة الثانية
    },
  ];
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    // محاذاة وتنسيق الحاوية لتشبه شاشات الجوال المتجاوبة (Mobile-First)
    <div
      className="w-full max-width-[480px] min-h-screen bg-gray-50/50 mx-auto font-sans antialiased pb-2"
      dir="rtl"
    >
      <div className="bg-white max-w-md mx-auto min-h-screen shadow-md flex flex-col">
        {/* شريط التنقل العلوي */}
        <HeaderRegister onMenuClick={() => setIsSidebarOpen(true)} />

        {/* بنر الترحيب للمسجلين */}
        <WelcomeBanner />

        {/* محرك البحث المتقدم */}
        <AdvancedSearch />

        {/* عنوان قسم عقارات مميزة */}
        <div className="flex items-center justify-between px-4 mt-5 mb-1">
          <h2 className="text-base font-bold text-gray-900">عقارات مميزة</h2>
          <a
            href="#"
            className="text-xs text-[#00b4db] font-medium hover:underline flex items-center"
          >
            عرض الكل <span className="mr-0.5 text-[10px]">‹</span>
          </a>
        </div>

        {/* قائمة العقارات المميزة */}
        <div className="flex flex-col">
          {featuredProperties.map((property) => (
            <PropertyCardRegister
              key={property.id}
              title={property.title}
              price={property.price}
              location={property.location}
              imageUrl={property.imageUrl}
              beds={property.beds}
              baths={property.baths}
              area={property.area}
              commentsCount={property.commentsCount}
              isFavorite={property.isFavorite}
            />
          ))}
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
