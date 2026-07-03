import Header from "@/components/mobile/Header";
import Footer from "@/components/mobile/Footer";
import PropertyCardRegister from "@/components/mobile/PropertyCardRegister";
import { auth } from "@clerk/nextjs/server"; // استيراد دالة السيرفر الصحيحة لـ Clerk
import prisma from "@/lib/prisma"; 
import React from "react";
import Sidebar from "@/components/mobile/SidebarVisit";
import HeroSection from "@/components/mobile/HeroSection";
import{redirect} from "next/navigation";
export default async function Home() {
  // جلب الجلسة والـ userId مباشرة من السيرفر بشكل آمن وسريع جداً
  const { userId } = await auth();

  if (!userId) {
    redirect("/m/login");
  }
  const dbUser =  await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true }
  });
  
  const userName = dbUser?.name || "Angel Harb";

  
  const properties = await prisma.property.findMany({
    where: {
      status: "APPROVED", 
    },
    include: {
      images: true,    
      comments: true,  
      wishlists: true, 
    },
    orderBy: {
      createdAt: "desc", 
    },
  });

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* تمرير تفعيل الأقسام للواجهة */}
      {/* ملاحظة: التحكم في فتح وإغلاق السايدبار يتم الآن بداخل المكونات أو عبر ميكانيزم السيرفر */}
      {/*// @ts-ignore */}
      <Sidebar />
    
      <Header />

      {/* 3. تمرير اسم المستخدم الفعلي القادم من قاعدة البيانات للـ HeroSection */}
      <HeroSection userName={userName} />

      {/* 4. قسم عرض العقارات المميزة الحية من قاعدة البيانات */}
      <main className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            عقارات مميزة في سوريا
          </h2>
          <button className="text-[#0984E3] font-bold text-lg hover:underline">
            عرض الكل
          </button>
        </div>

        {/* شبكة البطاقات الديناميكية الصارمة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties && properties.length > 0 ? (
            properties.map((property) => (
              <PropertyCardRegister 
                key={property.id}
                title={property.title} 
                price={property.price.toString()} 
                location={property.location ?? ""}
                imageUrl={property.images && property.images.length > 0 ? property.images[0].url : "/photo_2026-05-23_20-40-28.jpg"}
                baths={property.bathrooms}
                beds={property.rooms ?? 0}
                commentsCount={property.comments?.length || 0}
                area={property.area ?? 0}
              />
            ))
          ) : (
            <p className="text-center py-10 text-sm text-gray-500 col-span-full">
              لا توجد عقارات متاحة حالياً في قاعدة البيانات.
            </p>
          )}
        </div>
      </main>

      <Footer isHome={true} />
    </div>
  );
}
