"use client";
import React from "react";
import { Menu, Home as HomeIcon, Bell } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  onMenuClick?: () => void;
}
export default function Header({
  onMenuClick,
}: HeaderProps): React.JSX.Element {
  return (
    <header
      className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm"
      dir="rtl"
    >
      <nav className=" `max-w-[1200px]` mx-auto px-4 h-[75px] flex items-center justify-between">
        <div className="flex-1 flex justify-start">
          <button
            onClick={onMenuClick}
            type="button"
            className=" text-[#1286c8] text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors shadow-sm"
          >
            <Menu size={24} />
            <span className="absolute top-5 right-4 bg-red-500 w-2 h-2 rounded-full border-2 border-white"></span>
          </button>
        </div>
        <Link
          href="/"
          className="flex-2 flex justify-center items-center gap-2 "
        >
          <div className="bg-[#1286c8] p-1.5 rounded-xl ">
            <HomeIcon size={26} className=" text-white " />
          </div>
          <h1 className="text-4xl font-extrabold text-[#1286c8] tracking-tight">
            عقارك
          </h1>
        </Link>
        <div className="flex-1 flex justify-end">
          <Link
            href="/m/login"
            className="p-5 bg-[#00ADEE] text-white px-2 py-1.5 md:px-4 md:py-2 rounded-xl font-normal text-sm shadow-md hover:bg-[#0096ce] transition-all transform active:scale-95"
          >
            دخول / حساب جديد
          </Link>
        </div>
      </nav>
    </header>
  );
}
