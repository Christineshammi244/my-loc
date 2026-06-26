import React from "react";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function WelcomeBanner() {
  return (
    <div className="mx-4 mt-4 bg-gradient-to-br from-[#00b4db] bg-[#1ea0df] rounded-2xl p-5 text-white relative overflow-hidden shadow-sm">
      {/* الرسمة الخلفية الخفيفة للمنزل يمكن تمثيلها بـ Opacity */}
      <div className="absolute left-4 bottom-0 opacity-10 pointer-events-none">
        <span className="text-8xl">🏠</span>
      </div>

      <h1 className="text-xl font-bold mb-1">أهلاً بك مجدداً، أحمد</h1>
      <p className="text-xs text-blue-50 opacity-90 mb-4">
        لديك 3 عقارات جديدة تهمك اليوم
      </p>

      <button className="flex items-center gap-1.5 bg-white text-[#0083b0] px-4 py-2 rounded-full text-xs font-bold hover:bg-blue-50 transition-colors shadow-sm">
        <PlusCircle size={14} />
        <Link href="/m/add-property">أضف عقارك الآن</Link>
      </button>
    </div>
  );
}
