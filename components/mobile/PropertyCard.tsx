import React from "react";
import { FaSwimmer } from "react-icons/fa";
import Link from "next/link";
import {
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  Ruler,
  LandPlot,
  Droplet,
  FileText,
  Component,
  Waves,
  TreePine,
} from "lucide-react";
interface PropertyProps {
  tag: string;
  color: string;
  price: string;
  title: string;
  loc: string;
  space: string;
  img: string;
  rooms?: any;
  baths?: any;
  isFarm?: boolean;
}
export default function PropertyCard({
  tag,
  color,
  title,
  loc,
  space,
  rooms,
  baths,
  img,
  isFarm,
}: PropertyProps) {
  const isVilla = tag === "فيلا" || tag === "فيلا ملكية";
  return (
    <div
      className="bg-white rounded-[2rem] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full text-right"
      dir="rtl"
    >
      {/* قسم الصورة مع التاج */}
      <div className="relative h-60 overflow-hidden m-3 rounded-[1.5rem]">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <span
          className={`absolute top-4 right-4 px-4 py-1 rounded-full text-white text-xs font-bold ${color}`}
        >
          {tag}
        </span>
      </div>

      {/* تفاصيل العقار */}
      <div className="p-5 flex flex-col flex-grow text-right">
        <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">
          {title}
        </h3>
        <div
          className="flex items-center justify-start gap-1 text-gray-400 mb-2"
          dir="rtl"
        >
          <MapPin size={14} className=" text-gray-400" />
          <span className="text-sm font-medium ">{loc}</span>
        </div>

        {/* قسم الأيقونات المتغير */}
        <div className="grid grid-cols-3 gap-2 py-4 border-t border-gray-50 text-gray-700 mt-auto">
          {isFarm ? (
            <>
              <div className="flex flex-col items-center border-l border-gray-100">
                <svg
                  width="40"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mb-1 text-[#0984E3]"
                >
                  {/* المثلث الكبير الخلفي */}
                  <path d="M12 9 L16 2 L24 17" strokeWidth="2.1" />
                  {/* المثلث الصغير الأمامي المتداخل */}
                  <path d="M2 18 L7 6 L14 18" />
                  <path d="M2 18 H24" />
                </svg>
                <span className="text-xs font-bold">{space}</span>
              </div>
              <div className="flex flex-col items-center border-l border-gray-100">
                <Droplet size={24} className="mb-1 text-[#0984E3]" />
                <span className="text-xs font-bold">بئر ماء</span>
              </div>
              <div className="flex flex-col items-center">
                <FileText size={22} className="mb-1 text-[#0984E3]" />
                <span className="text-xs font-bold">طابو أخضر</span>
              </div>
            </>
          ) : isVilla ? (
            /* 2. حالة الفيلا (مسبح وحديقة) */
            <>
              <div className="flex flex-col items-center border-l border-gray-100">
                <Ruler size={24} className="mb-1 text-[#0984E3] rotate-315 " />
                <span className="text-xs font-bold">{space} م²</span>
              </div>
              <div className="flex flex-col items-center border-l border-gray-100">
                <FaSwimmer
                  size={24}
                  className="mb-1 text-[#0984E3] -scale-x-100"
                />
                <span className="text-xs font-bold">مسبح</span>
              </div>
              <div className="flex flex-col items-center">
                <TreePine size={24} className="mb-1 text-[#0984E3]" />
                <span className="text-xs font-bold">حديقة</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center border-l border-gray-100">
                <Ruler size={24} className=" text-[#0984E3] rotate-315 " />
                <span className="text-xs font-bold">{space} م²</span>
              </div>
              <div className="flex flex-col items-center border-l border-gray-100">
                <BedDouble size={22} className="mb-1 text-[#0984E3]" />
                <span className="text-xs font-bold">{rooms} غرف</span>
              </div>
              <div className="flex flex-col items-center">
                <Bath size={22} className="mb-1 text-[#0984E3]" />
                <span className="text-xs font-bold">{baths} حمام</span>
              </div>
            </>
          )}
        </div>

        {/* الزر الموسط بالأسفل */}
        <Link
          href="/m/login"
          className="w-full mt-4 py-4 bg-gray-50 text-gray-400 rounded-2xl text-xs font-medium hover:bg-blue-50 hover:text-blue-500 transition-all border border-transparent hover:border-blue-100"
        >
          سجل دخولك لعرض السعر وتفاصيل التواصل
        </Link>
      </div>
    </div>
  );
}
