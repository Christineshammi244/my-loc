import React from "react";
import { Menu, Bell, HomeIcon } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  onMenuClick?: () => void;
}
export default function Navbar({
  onMenuClick,
}: HeaderProps): React.JSX.Element {
  return (
    <nav
      className="w-full flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-50"
      dir="rtl"
    >
      <div className="flex-1 flex justify-start gap-2">
        <button
          onClick={onMenuClick}
          type="button"
          className=" text-[#1286c8] text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors shadow-sm"
        >
          <Menu size={20} />
          <span className="absolute top-5 right-4 bg-red-500 w-2 h-2 rounded-full border-2 border-white"></span>
        </button>

        <Link href="/" className="flex-2 flex items-center  ">
          <div className="bg-[#1286c8] p-1.5 rounded-xl ">
            <HomeIcon size={26} className=" text-white " />
          </div>
          <h1 className="text-4xl font-extrabold text-[#1286c8] px-1 tracking-tight">
            عقارك
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link
          href="/m/notifications"
          className="text-gray-600 hover:text-gray-900 relative"
        >
          <Bell size={22} />
        </Link>
        <div className="w-9 h-9 rounded-full bg-[#fcefdc] border-2 border-[#f3d09e] flex items-center justify-center overflow-hidden cursor-pointer">
          <span className="text-sm">🌴</span>
        </div>
      </div>
    </nav>
  );
}
