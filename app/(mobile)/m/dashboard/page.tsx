"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
//import Footer from "@/components/Footer";
import {
  Search,
  MapPin,
  Bed,
  Bath,
  Maximize,
  PlusCircle,
  Share2,
  Heart,
  MessageSquare,
  ChevronDown,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-right" dir="rtl">
      <PropertyCard
        tag="للبيع"
        color="bg-blue-500"
        price="250.000"
        title="شقة مودرن في وسط المدينة"
        loc="حمص "
        space="120"
        rooms="3"
        baths="2"
        img="/house.jpg"
      />
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-10">
        {/* Banner الترحيبي */}
        <section className="bg-[#00B4D8] text-white p-6 md:p-10 `rounded-[32px]` flex flex-col md:flex-row items-center justify-between shadow-xl relative overflow-hidden">
          <div className="z-10 text-center md:text-right">
            <h1 className="text-2xl md:text-3xl font-black mb-2">
              أهلاً بك مجدداً، أحمد
            </h1>
            <p className="text-xs md:text-sm opacity-90 mb-6">
              لديك 3 عقارات جديدة تهمك اليوم
            </p>
            <button className="bg-white text-[#00B4D8] px-6 py-2.5 rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 mx-auto md:mr-0 hover:bg-gray-100 transition shadow-lg">
              <PlusCircle size={18} />
              <span>أضف عقارك الآن</span>
            </button>
          </div>
          <div className="hidden md:block absolute `left-[-20px]` `bottom-[-20px]` opacity-10 rotate-12">
            <PlusCircle size={200} />
          </div>
        </section>

        {/* قسم البحث المتقدم */}
        <section className="relative `rounded-[32px]` overflow-hidden `min-h-[400px]` flex items-center justify-center p-4 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200"
            className="absolute inset-0 w-full h-full object-cover"
            alt="Background"
          />
          <div className="absolute inset-0 bg-black/40"></div>

          <div className="relative z-10 w-full max-w-4xl bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-[28px] shadow-2xl border border-white/20">
            <h2 className="text-center font-black text-gray-800 text-lg mb-6">
              محرك البحث المتقدم
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SearchField label="المحافظة" val="دمشق" />
              <SearchField label="المنطقة" val="المزة" />
              <SearchField label="نوع العقار" val="شقة سكنية" />
              <div className="md:col-span-2 flex flex-col gap-1">
                <label className="text-[10px] font-bold text-gray-400 pr-1">
                  المساحة أو الحي
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="مثلاً 150 م²"
                    className="w-full bg-gray-100 p-3 rounded-xl border border-gray-100 text-xs text-right outline-none focus:border-blue-300"
                  />
                  <Search
                    className="absolute left-3 top-3 text-gray-300"
                    size={16}
                  />
                </div>
              </div>
              <button className="bg-[#FFB703] hover:bg-orange-500 text-white py-3.5 rounded-xl font-black text-sm transition transform active:scale-95 shadow-lg shadow-orange-100">
                ابدأ البحث
              </button>
            </div>
          </div>
        </section>

        {/* قائمة العقارات */}
        <section className="px-2">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-black text-gray-800">عقارات مميزة</h2>
            <button className="text-blue-500 text-xs font-bold hover:underline">
              عرض الكل
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PropertyCard
              tag="شقة للبيع"
              color="bg-[#FFB703]"
              price="2.4 مليار"
              title="شقة ديلوكس في المالكي"
              loc="دمشق، منطقة المالكي"
              space="180"
              rooms="3"
              baths="2"
              img="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800"
            />
            <PropertyCard
              tag="فيلا ملكية"
              color="bg-[#00B4D8]"
              price="5.8 مليار"
              title="فيلا مودرن في يعفور"
              loc="ريف دمشق، يعفور"
              space="1200"
              img="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=800"
            />
            <PropertyCard
              tag="أرض زراعية"
              color="bg-green-500"
              price="900 مليون"
              title="مزرعة مثمرة في جبلة"
              loc="اللاذقية، ريف جبلة"
              space="5 دونم"
              img="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

// مكونات مساعدة
function SearchField({ label, val }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-bold text-gray-400 pr-1">
        {label}
      </label>
      <div className="flex items-center justify-between bg-gray-100 p-3 rounded-xl border border-gray-100 text-xs font-bold text-gray-600 cursor-pointer">
        <ChevronDown size={14} className="text-gray-400" />
        <span>{val}</span>
      </div>
    </div>
  );
}

function PropertyCard({
  tag,
  color,
  price,
  title,
  loc,
  space,
  rooms,
  baths,
  img,
}) {
  return (
    <div
      className={`bg-white rounded-24px overflow-hidden shadow-sm border border-gray-100 text-right group hover:shadow-xl transition-all duration-300`}
    >
      <div className={`relative h-48 overflow-hidden`}>
        <img
          src={img}
          className={`w-full h-full object-cover group-hover:scale-110 transition duration-500`}
          alt={title}
        />
        <span
          className={`absolute top-3 right-3 ${color} text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-md`}
        >
          {tag}
        </span>
        <button
          className={`absolute top-3 left-3 p-2 bg-white/80 backdrop-blur rounded-full text-red-500 hover:bg-white transition shadow-md`}
        >
          <Heart size={16} />
        </button>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-gray-800 text-sm truncate">{title}</h3>
          <span className="text-[#FFB703] font-black text-sm">{price} ل.س</span>
        </div>
        <p className="text-gray-400 text-[10px] flex items-center gap-1 justify-end mb-4">
          <MapPin size={10} className="text-blue-400" /> {loc}
        </p>
        <div className="grid grid-cols-3 gap-2 py-3 border-t border-gray-50 text-gray-500">
          <IconBox icon={<Maximize size={14} />} label={` ${space} م²`} />
          <IconBox icon={<Bed size={14} />} label={` ${rooms} غرف`} />
          <IconBox icon={<Bath size={14} />} label={` ${baths} حمام `} />
        </div>
        <button className="w-full mt-4 py-2.5 bg-gray-50 text-gray-400 rounded-xl text-[10px] font-bold hover:bg-blue-50 hover:text-blue-500 transition border border-transparent hover:border-blue-100">
          سجل دخولك لعرض السعر وتفاصيل التواصل
        </button>
      </div>
    </div>
  );
}

function IconBox({ icon, label }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="text-blue-500">{icon}</div>
      <span className="text-[9px] font-bold">{label}</span>
    </div>
  );
}
