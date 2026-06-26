import React from "react";
import {
  Heart,
  Share2,
  MessageSquare,
  ChevronDown,
  MapPin,
} from "lucide-react";
import Link from "next/link";

interface PropertyProps {
  title: string;
  price: string;
  location: string;
  imageUrl: string;
  beds: number;
  baths: number;
  area: number;
  commentsCount: number;
  isFavorite?: boolean;
}

export default function PropertyCard({
  title,
  price,
  location,
  imageUrl,
  beds,
  baths,
  area,
  commentsCount,
  isFavorite = false,
}: PropertyProps) {
  return (
    <div className="mx-4 mt-4 bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col">
      {/* قسم الصورة العلوي */}
      <div
        className="h-44 w-full bg-cover bg-center relative"
        style={{ backgroundImage: `url("${imageUrl}")` }}
      >
        {/* زر المفضلة الدائري */}
        <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-red-500 hover:bg-white transition-colors">
          <Heart
            size={16}
            fill={isFavorite ? "#ef4444" : "none"}
            className={isFavorite ? "text-red-500" : "text-gray-400"}
          />
        </button>

        {/* شارة للبيع الزرقاء أسفل اليمين */}
        <span className="absolute bottom-3 right-3 bg-[#00b4db] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
          للبيع
        </span>
      </div>

      {/* تفاصيل العقار */}
      <div className="p-3">
        <div className="flex items-center justify-end mb-1 " dir="rtl">
          <span className="text-sm font-bold text-[#cca43b]">{price}</span>
        </div>
        <h3 className="text-sm font-bold text-gray-900">{title}</h3>
        <div className="flex items-center gap-1 text-[11px] mb-1" dir="rtl">
          <MapPin size={13} className=" text-gray-500" />
          <span className="text-xs font-medium text-gray-600 ">{location}</span>
        </div>

        {/* المميزات والأيقونات السفلى */}
        <div className="border-t border-gray-100 pt-2.5 flex items-center justify-between text-gray-600 text-xs">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">🛏️ {beds}</span>
            <span className="flex items-center gap-1">🛁 {baths}</span>
            <span className="flex items-center gap-1 font-medium">
              📐 {area} م²
            </span>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <Share2 size={15} />
          </button>
        </div>
      </div>

      {/* شريط التعليقات الممتد أسفل البطاقة */}
      <Link
        href="/m/comments"
        className="w-full bg-[#fbfcfd] border-t border-gray-100 py-2.5 px-4  text-[11px] text-[#0083b0] font-medium flex items-center justify-start gap-3 hover:bg-gray-50/50 transition-colors"
        dir="rtl"
      >
        <MessageSquare size={13} />
        <span>التعليقات ({commentsCount})</span>
        <ChevronDown size={12} className="mr-auto mt-0.5" />
      </Link>
    </div>
  );
}
