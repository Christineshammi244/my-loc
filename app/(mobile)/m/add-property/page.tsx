"use client";

import Link from "next/link";
import { ArrowLeft, ImagePlus } from "lucide-react";
import { PhoneShell } from "@/components/mobile/phone-shell";
import { addProperty } from "@/app/actions/propertyActions"; 
import { useState, use, startTransition } from "react";
import { CldUploadWidget , CloudinaryUploadWidgetResults} from 'next-cloudinary';
const propertyTypes = [
  { id: "APARTMENT", name: "شقة", icon: () => <span className="text-xl">🏢</span> },
  { id: "VILLA", name: "فيلا", icon: () => <span className="text-xl">🏡</span> },
  { id: "COMMERCIAL", name: "تجاري", icon: () => <span className="text-xl">🏢</span> },
  { id: "LAND", name: "أرض", icon: () => <span className="text-xl">🌱</span> },
];

interface PageProps {
  searchParams: Promise<{
    step?: string;
    success?: string;
    type?: string;
    floor?: string;
    title?: string;
    city?: string;
    location?: string;
    price?: string;
    description?: string;
    area?: number;
    rooms?:  number;
    bathrooms?:  number;
    bedrooms?:  number;
  }>;
}

export default function AddPropertyPage({ searchParams }: PageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  
  const params = use(searchParams);
  
  const isSuccess = params.success === "true";
  const currentStep = Number(params.step) || 1;
  const selectedType = params.type || "APARTMENT";
  const currentTitle = params.title || "";
  const currentCity = params.city || "";
  const currentLocation = params.location || "";
  const currentPrice = params.price || "";
  const currentDescription = params.description || "";
  const currentarea = params.area  || "";
  const currentrooms  = params.rooms  || "";
  const currentbathrooms  = params.bathrooms  ||   "";
  const currentfloor  = params.floor  ||   "";
  const currentbedrooms  = params.bedrooms ||   "";
async function handleAction(formData: FormData) {
    if (isSubmitting) return;
    setIsSubmitting(true);

    startTransition(async () => {
      try {
        // استقبال النتيجة الصافية من السيرفر للتأكد من نزولها بالداتابيز أولاً
        const res = await addProperty(formData);
        
        if (res && 'success' in res && res.success) {
          alert("تم إرسال طلبكِ بنجاح! سيتم مراجعة العقار من قِبل الإدارة والاستجابة خلال 24 ساعة لتقديمه لقسم المعاملات.");
          // التحويل يتم هنا في المتصفح بأمان كامل بعد اكتمال الحفظ الحقيقي
          window.location.href = "/m/add-property?success=true";
        } else {
          alert("فشلت عملية الحفظ: " + (res?.error || "خطأ غير معروف"));
        }
      } catch (error) {
        console.error("Error submitting property:", error);
        alert("حدث خطأ أثناء إرسال البيانات، يرجى إعادة المحاولة من جديد.");
      } finally {
        setIsSubmitting(false);
      }
    });
  }
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
            </div><div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">المدينة</label>
                <input type="text" name="city" defaultValue={currentCity} className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none" required />
              </div>
                <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">الطابق</label>
                <input type="text" name="city" defaultValue={currentfloor} className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none" required />
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
        )}{/* ================= الخطوة 2: تفاصيل السعر والوصف ================= */}
        {currentStep === 2 && (
          <form method="GET" action="" className="space-y-4">
            <input type="hidden" name="step" value="3" />
            <input type="hidden" name="type" value={selectedType} />
            <input type="hidden" name="title" value={currentTitle} />
            <input type="hidden" name="city" value={currentCity} />
            <input type="hidden" name="location" value={currentLocation} />
            <input type="hidden" name="area" value={currentarea} />
            <input type="hidden" name="rooms" value={currentrooms} />
            <input type="hidden" name="bathrooms" value={currentbathrooms} />
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">السعر ($)</label>
              <input type="number" name="price" defaultValue={currentPrice} className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none" required />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">الوصف التفصيلي</label>
              <textarea name="description" defaultValue={currentDescription} rows={4} className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">المساحة</label>
              <textarea name="area" defaultValue={currentarea}  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none" required />
            </div>
              <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">عدد الغرف</label>
              <textarea name="rooms" defaultValue={currentrooms}  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none" required />
            </div>
              <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">عدد غرف النوم</label>
              <textarea name="bedrooms" defaultValue={currentbedrooms}  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none" required />
            </div>
              <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">عدد الحمامات</label>
              <textarea name="bathrooms" defaultValue={currentbathrooms}  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none" required />
            </div>
            <button type="submit" className="w-full min-h-11 rounded-xl bg-[#2e84d6] font-bold text-white flex items-center justify-center gap-1">
              التالي (صور العقار) <ArrowLeft className="h-4 w-4" />
            </button>
          </form>
        )}

        {/* ================= الخطوة 3: رفع الصور والمعاينة المباشرة ================= */}
        {currentStep === 3 && (
          <form action={handleAction} className="space-y-4">
            <input type="hidden" name="title" value={currentTitle} />
            <input type="hidden" name="city" value={currentCity} />
            <input type="hidden" name="location" value={currentLocation} />
            <input type="hidden" name="type" value={selectedType} />
            <input type="hidden" name="price" value={currentPrice} />
            <input type="hidden" name="description" value={currentDescription} />
            <input type="hidden" name="category" value="RESIDENTIAL" />

            <div className="border-2 border-dashed border-blue-200 rounded-2xl p-6 bg-slate-50/50 text-center flex flex-col items-center justify-center min-h-[180px]">
 <CldUploadWidget 
  uploadPreset="a0skblef"
  onSuccess={(results: CloudinaryUploadWidgetResults) => {
    // التحقق من أن النتيجة تحتوي على معلومات الصورة بنجاح
    if (results.info && typeof results.info !== "string" && results.info.secure_url) {
      const url = results.info.secure_url;
      setPreviewImages((prev) => [...prev, url]);
    }
  }}
>
  {({ open }) => (
    <button 
      type="button" 
      onClick={() => open()}
      className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-xl"
    >
      اضغط هنا لرفع الصور
    </button>
  )}
</CldUploadWidget>
              {/* شبكة الصور المختارة للمعاينة المباشرة فور الاختيار */}
              {previewImages.length > 0 ? (
                <div className="grid grid-cols-4 gap-2 mb-4 w-full max-h-[160px] overflow-y-auto p-1">
                  {previewImages.map((src, idx) => (
                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border bg-white shadow-sm">
                      <img src={src} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                    <ImagePlus className="w-5 h-5 text-[#2e84d6]" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 mb-0.5">صور العقار</h3>
                  <p className="text-xs text-slate-400 mb-3">يمكنك رفع حتى 10 صور (JPG, PNG)</p>
                </>
              )}
              
              <label className="cursor-pointer bg-[#2e84d6] hover:bg-blue-600 text-white font-bold text-xs py-2 px-6 rounded-xl transition shadow-sm">
                {previewImages.length > 0 ? "تغيير الصور الحالية" : "اختر الصور"}
                <input 
                  type="file" 
                  name="images" 
                  accept="image/*" 
                  multiple 
                  className="hidden" 
                  required 
                  onChange={(e) => {
                    if (e.target.files) {
                      const filesArray = Array.from(e.target.files);
                      const urls = filesArray.map(file => URL.createObjectURL(file));setPreviewImages(urls); // توليد روابط المعاينة فوراً
                    }
                  }}
                />
              </label>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full min-h-12 rounded-xl bg-emerald-600 font-bold text-white transition shadow-sm mt-2 disabled:bg-slate-400 cursor-pointer"
            >
              {isSubmitting ? "جاري رفع الصور والبيانات..." : "تأكيد وإضافة العقار نهائياً"}
            </button>
          </form>
        )}

      </div>
    </PhoneShell>
  );
}