//import { redirect } from "next/navigation";
//export default function Home() {
//redirect("/admin/transactions");
//}
"use client";
import Header from "@/components/mobile/Header";
import Footer from "@/components/mobile/Footer";
import PropertyCard from "@/components/mobile/PropertyCard";
import { Menu, Home as HomeIcon, Bell } from "lucide-react";
// سنقوم بإنشاء هذا المكون الجديد الآن ليكون الكود منظماً
import HeroSection from "@/components/mobile/HeroSection";
export default function Home() {
  // بيانات تجريبية (Mock Data) مطابقة تماماً للصورة لتظهر في البطاقات
  const properties = [
    {
      id: 1,
      tag: "شقة للبيع",
      color: "bg-[#F7B731]", // لون برتقالي مثل "شقة دوبلكس"
      price: "250,000",
      title: "شقة ديلوكس في المالكي",
      loc: "دمشق، منطقة المالكي",
      space: "180",
      rooms: "3",
      baths: "2",
      img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 2,
      tag: "فيلا ملكية",
      color: "bg-[#0984E3]", // لون أزرق مثل "فيلا مودرن"
      price: "1,200",
      title: "فيلا مودرن في يعفور",
      loc: "ريف دمشق، يعفور",
      space: "1200",
      rooms: "مسبح",
      baths: "حديقة",
      img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop",
      // https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=600&auto=format&fit=crop
    },
    {
      id: 3,
      tag: "أرض زراعية",
      color: "bg-[#27AE60]", // لون أخضر مثل "مزرعة مثمرة"
      price: "90,000",
      title: "مزرعة مثمرة في جبلة",
      loc: "اللاذقية، ريف جبلة",
      space: "5 دوانم",
      isFarm: true,
      img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop",
    },
  ];

  return (
    // استخدام dir="rtl" لتنسيق اللغة العربية بشكل تلقائي وصحيح
    <div className="min-h-screen bg-white" dir="rtl">
      <Header />

      {/* 1. قسم الواجهة الأساسي (Hero Section) مع البحث */}
      <HeroSection />

      {/* 2. قسم عرض العقارات المميزة */}
      <main className="max-w-1200px mx-auto px-4 py-12">
        {/* عنوان القسم مع زر "عرض الكل" */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            عقارات مميزة في سوريا
          </h2>
          <button className="text-[#0984E3] font-bold text-lg hover:underline">
            عرض الكل
          </button>
        </div>

        {/* شبكة البطاقات (Card Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            // نستخدم مكون PropertyCard الذي أصلحناه سابقاً
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </main>

      <Footer isHome={true} />
    </div>
  );
}
