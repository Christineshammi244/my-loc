import React from "react";
import { FaFacebook , FaGoogle } from "react-icons/fa";

export const SocialAuth: React.FC = () => {
  return (
    <div className="w-full space-y-4">
      <div className="relative flex items-center justify-center py-2">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="px-3 text-gray-500 text-xs bg-white z-10 font-medium">
          أو عبر
        </span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>

      <div className="flex gap-4" dir="ltr">
        <button className="flex-1 flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all">
          Google <FaGoogle size={18} className="text-[#1286c8]" />
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all">
          Facebook <FaFacebook size={18} className="text-[#1286c8]" />
        </button>
      </div>
    </div>
  );
};
