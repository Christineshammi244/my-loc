import { ChevronDown, Search, MapPin } from "lucide-react";
interface category {
  name: string;
  active: boolean;
}

export default function HeroSection(): React.JSX.Element {
  // التصنيفات السريعة أسفل البحث
  const categories = [
    { name: "شقق", active: false },
    { name: "فلل وقصور", active: false },
    { name: "أراضي زراعية", active: false },
    { name: "عقارات تجارية", active: false },
  ];

  return (
    <>
      <section className="relative w-full h-[550px] overflow-hidden">
        {/* 1. خلفية الصورة مع تراكب أزرق فاتح (مثل الصورة) */}
        <img
          src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1600&auto=format&fit=crop"
          alt="Syrian Cityscape"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* 2. محتوى الواجهة (Text and Search Bar) */}
        <div className="relative z-10 max-w-[800px] mx-auto h-full flex flex-col justify-center items-center text-center px-4">
          {/* العنوان الرئيسي */}
          <h1 className="text-5xl font-extrabold text-white mb-6 leading-tight">
            ابحث عن منزل أحلامك في سوريا
          </h1>
          <p className="text-xl text-white opacity-90 mb-12 max-w-lg">
            أكبر منصة عقارية لبيع وتأجير العقارات في دمشق وحلب واللاذقية
          </p>
          {/* صندوق البحث (Search Box)  */}
          <div className=" bg-white p-5 rounded-2xl shadow-xl w-full ">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              {/* حقول البحث (Inputs) */}
              <div className="relative flex-1">
                <select className="w-full p-4 shadow-lg border border-gray-200 rounded-xl text-gray-700 text-lg outline-none appearance-none pr-10">
                  <option value="disabled selected"> المحافظة</option>
                  <option>دمشق</option>
                  <option>ريف دمشق</option>
                  <option>حمص</option>
                  <option>حلب</option>
                  <option>اللاذقية</option>
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              <div className="relative flex-1">
                <select className="w-full p-4 shadow-lg border border-gray-200 rounded-xl text-gray-700 text-lg outline-none appearance-none pr-10">
                  <option value=" disabled selected">نوع العقار</option>
                  <option>شقة</option>
                  <option>فيلا</option>
                  <option>أرض زراعية</option>
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              <div className=" flex items-center shadow-lg border border-gray-200 rounded-xl px-4 bg-gray-50 text-lg  ">
                <Search className="text-gray-400 mr-2" size={22} />
                <input
                  type="text"
                  placeholder="المنطقة أو الحي ..."
                  className="flex-1 p-4 rounded-lg text-gray-700 text-xl outline-none"
                />
              </div>
            </div>

            {/* زر البحث الكبير */}
            <button className="w-full bg-[#0984E3] text-white py-4 px-6 rounded-xl text-xl font-bold flex items-center justify-center gap-3 hover:bg-[#0070c3] transition-colors">
              بحث سريع
            </button>
          </div>
          {/* 3. التصنيفات السريعة (تأكدي من استخدام dir="rtl" هنا لترتيبهم صح) */}
        </div>
      </section>
      <div
        className=" bottom-10 left-0 right-0 z-10 flex justify-center gap-3 overflow-x-auto px-4 py-8 shadow-sm"
        dir="rtl"
      >
        {categories.map((cat, index) => (
          <button
            key={index}
            className={`px-6 py-3 rounded-full text-lg font-medium border border-gray-300 shadow-md  text-gray-900 hover:border-gray-400 hover:text-[]#0984E3 transition-all ${cat.active}? "}`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </>
  );
}
