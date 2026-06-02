"use client";
import React from "react";
import Link from "next/link";
import { Home, BadgeCheck, AtSign } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
interface FooterProps {
  isHome?: boolean;
}
export default function Footer({ isHome }: FooterProps) {
  if (isHome) {
    return (
      <footer
        className="w-full py-12 border-t border-white/10 bg-[#0f172a] text-white"
        dir="rtl"
      >
        <div className="container mx-auto px-6 md:px-12">
          {/* تم تغيير عدد الأعمدة لـ 3 ليتناسب مع أقسامك */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start text-right">
            {/* القسم الأول: عقارك - أضفنا مسافة بعد md:order-3 */}
            <div className="md:order-1 space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="bg-blue-600 p-1.5 rounded-lg flex items-center justify-center">
                  <Home size={20} className="text-white" />
                </div>
                <span className="font-bold text-2xl text-blue-600">عقارك</span>
              </Link>
              <p className="text-white/80 text-sm leading-relaxed max-w-xs">
                المنصة الأولى والآمنة للبحث عن العقارات في كافة المحافظات
                السورية. نسهل عليك الوصول لمنزل أحلامك بضغطة زر واحدة.
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <BadgeCheck
                    size={16}
                    className="text-yellow-500 fill-yellow-500/10"
                  />
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <AtSign size={16} className="text-gray-400" />
                </div>
              </div>
            </div>

            {/* القسم الثاني: روابط سريعة - المنتصف */}
            <div className="md:order-2 flex flex-col md:items-center">
              <div className="w-full md:max-w-[200px]">
                <h3 className="font-bold text-lg mb-2">روابط سريعة</h3>
                <div className="border-t border-white/10 pt-2 h-[2px] w-full mb-4 "></div>
                <ul className="space-y-3 text-sm text-white/80">
                  <li>
                    <Link
                      href="/"
                      className="hover:text-white transition-colors"
                    >
                      عن المنصة
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/properties"
                      className="hover:text-white transition-colors"
                    >
                      سياسة الخصوصية
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/add-property"
                      className="hover:text-white transition-colors"
                    >
                      شروط الاستخدام
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* القسم الثالث: المحافظات - أقصى اليسار */}
            <div className="md:order-3 flex flex-col md:items-start">
              <div className="w-full md:max-w-[200px]">
                <h3 className="font-bold text-lg mb-2">عقارات المحافظات</h3>
                <div className="border-t border-white/10 pt-2 h-[2px] w-full mb-4"></div>
                <ul className="space-y-3 text-sm text-white/80">
                  <li>
                    <Link
                      href="/properties?city=damascus"
                      className="hover:text-white transition-colors"
                    >
                      عقارات دمشق
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/properties?city=homs"
                      className="hover:text-white transition-colors"
                    >
                      عقارات حمص
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/properties?city=aleppo"
                      className="hover:text-white transition-colors"
                    >
                      عقارات حلب
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/properties?city=latakia"
                      className="hover:text-white transition-colors"
                    >
                      عقارات طرطوس
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* حقوق النشر */}
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/50">
            <p>
              &copy; {new Date().getFullYear()} عقارك سوريا. جميع الحقوق محفوظة
            </p>
          </div>
        </div>
      </footer>
    );
  }
  return (
    <footer className="bg-white text-gray-600 py-8 px-6 border-t border-gray-100 font-sans">
      <div
        className="max-w-6xl mx-auto flex flex-col items-center gap-6 text-center "
        dir="rtl"
      >
        <div className="flex items-center gap-2 text-2xl font-bold text-[#1286c8] ">
          <Home
            className="bg-[#1286c8] p-1.5 rounded-lg flex items-center justify-center text-white"
            size={28}
          />
          <span>عقارك</span>
        </div>

        <div className="flex flex-wrap justify-center gap-8 text-sm font-medium">
          <span className="hover:text-black cursor-pointer">عن المنصة</span>
          <span className="hover:text-black cursor-pointer">
            الشروط والأحكام
          </span>
          <span className="hover:text-black cursor-pointer">
            سياسة الخصوصية
          </span>
          <span className="hover:text-black cursor-pointer">اتصل بنا</span>
        </div>

        <div className="flex gap-5">
          <div className="p-2 bg-gray-100 rounded-full hover:bg-gray-100 cursor-pointer transition-colors text-black">
            <FaFacebook size={20} />
          </div>
          <div className="p-2 bg-gray-100 rounded-full hover:bg-gray-100 cursor-pointer transition-colors text-black">
            <FaTwitter size={20} />
          </div>
          <div className="p-2 bg-gray-100 rounded-full hover:bg-gray-100 cursor-pointer transition-colors text-black">
            <FaInstagram size={20} />
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          © 2026 عقارك سوريا. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}
