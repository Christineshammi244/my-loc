import Link from "next/link";
import { ArrowLeft, ArrowRight, ImagePlus } from "lucide-react";
import { PhoneShell } from "@/components/mobile/phone-shell";
import { addProperty } from "@/app/actions/propertyActions"; // تأكدي من مسار ملف الأكشن لديكِ

const propertyTypes = [
  { id: "APARTMENT", name: "شقة", icon: () => <span className="text-xl">🏢</span> },
  { id: "VILLA", name: "فيلا", icon: () => <span className="text-xl">🏡</span> },
  { id: "COMMERCIAL", name: "تجاري", icon: () => <span className="text-xl">🏢</span> },
  { id: "LAND", name: "أرض", icon: () => <span className="text-xl">🌱</span> },
];

interface PageProps {
  searchParams: Promise<{
    step?: string;
    type?: string;
    title?: string;
    city?: string;
    location?: string;
    price?: string;
    description?: string;
  }>;
}

export default async function AddPropertyPage({ searchParams }: { searchParams: Promise<{ step?: string; success?: string; type?: string; title?: string; city?: string; location?: string; price?: string; description?: string }> }) {
  
  // 1. فك محتويات الرابط وقراءتها
  const params = await searchParams;
  
  // 2. قراءة متغير النجاح (إذا رجعنا من الأكشن بنجاح)
  const isSuccess = params.success === "true";

  // 3. قراءة قيم الحقول الحالية الخاصة بالخطوات المتعددة (كودك القديم مصلح)
  const currentStep = Number(params.step) || 1;
  const selectedType = params.type || "APARTMENT";
  const currentTitle = params.title || "";
  const currentCity = params.city || "";
  const currentLocation = params.location || "";
  const currentPrice = params.price || "";
  const currentDescription = params.description || "";

  return (
    <PhoneShell title={currentStep === 1 ? "البيانات الأساسية" : currentStep === 2 ? "الأسعار والتفاصيل" : "صور العقار"}>
      <div className="rounded-2xl bg-white p-3">
        {isSuccess && (
    <div className="mb-4 p-3 bg-emerald-50 text-emerald-800 rounded-xl text-center border border-emerald-200 font-bold text-xs">
      تم إدخال طلبك لمرحلة التقييم بنجاح، وتم توجيهه إلى الإدارة للمراجعة في قسم المعاملات.
    </div>
  )}
        {/* ================= الخطوة 1: البيانات الأساسية ================= */}
        {currentStep === 1 && (
          <form method="GET" action="" className="space-y-4">
            <input type="hidden" name="step" value="2" />
            <input type="hidden" name="type" value={selectedType} />

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5">نوع العقار</label>
              <div className="grid grid-cols-4 gap-2">
                {propertyTypes.map((t) => (
                  <Link
                    key={t.id}
                    href={`?step=1&type=${t.id}&title=${encodeURIComponent(currentTitle)}&city=${encodeURIComponent(currentCity)}&location=${encodeURIComponent(currentLocation)}`}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border transition text-center min-h-16 ${
                      selectedType === t.id ? "border-[#2e84d6] bg-blue-50/50 text-[#2e84d6]" : "border-slate-100 text-slate-600"
                    }`}
                  >
                    <t.icon />
                    <span className="text-[10px] font-bold mt-1">{t.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">عنوان الإعلان</label>
              <input type="text" name="title" defaultValue={currentTitle} className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none" required />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">المدينة</label>
                <input type="text" name="city" defaultValue={currentCity} className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">الموقع / الحي</label>
                <input type="text" name="location" defaultValue={currentLocation} className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none" required />
              </div>
            </div>

            <button type="submit" className="w-full min-h-11 rounded-xl bg-[#2e84d6] font-bold text-white flex items-center justify-center gap-1">
              التالي <ArrowLeft className="h-4 w-4" />
            </button>
          </form>
        )}

        {/* ================= الخطوة 2: تفاصيل السعر والوصف ================= */}
          {currentStep === 2 && (
          <form method="GET" action="" className="space-y-4">
            <input type="hidden" name="step" value="3" />
            <input type="hidden" name="type" value={selectedType} />
            <input type="hidden" name="title" value={currentTitle} />
            <input type="hidden" name="city" value={currentCity} />
            <input type="hidden" name="location" value={currentLocation} />

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">السعر (ل.س)</label>
              <input type="number" name="price" defaultValue={currentPrice} className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none" required />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">الوصف التفصيلي</label>
              <textarea name="description" defaultValue={currentDescription} rows={4} className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none" required />
            </div>

            <button type="submit" className="w-full min-h-11 rounded-xl bg-[#2e84d6] font-bold text-white flex items-center justify-center gap-1">
              التالي (صور العقار) <ArrowLeft className="h-4 w-4" />
            </button>
          </form>
        )}

        {/* ================= الخطوة 3: رفع الصور والإرسال الفعلي لـ Prisma ================= */}
        {currentStep === 3 && (
        <form 
  action={async (formData: FormData) => {
    "use server";
    await addProperty(formData);
  }} 
  
  className="space-y-4"
>
            {/* حقول مخفية تحمل البيانات الحقيقية المستخرجة من الـ URL */}
            <input type="hidden" name="title" value={currentTitle} />
            <input type="hidden" name="city" value={currentCity} />
            <input type="hidden" name="location" value={currentLocation} />
            <input type="hidden" name="type" value={selectedType} />
            <input type="hidden" name="price" value={currentPrice} />
            <input type="hidden" name="description" value={currentDescription} />
            <input type="hidden" name="category" value="RESIDENTIAL" />

            <div className="border-2 border-dashed border-blue-200 rounded-2xl p-6 bg-slate-50/50 text-center flex flex-col items-center justify-center min-h-[180px]">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                <ImagePlus className="w-5 h-5 text-[#2e84d6]" />
              </div>
              <h3 className="text-sm font-bold text-slate-800 mb-0.5">صور العقار</h3>
              <p className="text-xs text-slate-400 mb-3">يمكنك رفع حتى 10 صور (JPG, PNG)</p>
              
              <label className="cursor-pointer bg-[#2e84d6] hover:bg-blue-600 text-white font-bold text-xs py-2 px-6 rounded-xl transition shadow-sm">
                اختر الصور
                <input type="file" name="propertyImages" accept="image/*" multiple className="hidden" required />
              </label>
            </div>

            <button type="submit" className="w-full min-h-12 rounded-xl bg-emerald-600 font-bold text-white transition shadow-sm mt-2">
              تأكيد وإضافة العقار نهائياً
            </button>
          </form>
        )}

      </div>
    </PhoneShell>
  );
}