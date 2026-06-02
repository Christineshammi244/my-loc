"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PhoneShell } from "@/components/mobile/phone-shell";
import { PencilLine, ShieldCheck, Loader2 } from "lucide-react";
import { submitContractRequest, getUserContractDetails } from "@/app/actions/propertyActions";

interface UploadItem {
  id: string;
  label: string;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ContractReviewPage({ params }: PageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  
  // لجلب المعرف ديناميكياً من الرابط
  const propertyId = resolvedParams.id || "1"; 

  const [currentStep, setCurrentStep] = useState(3);
  const [loading, setLoading] = useState(true);
  
  // حالات حفظ البيانات الحقيقية القادمة من قاعدة البيانات
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<Record<string, { name: string }[]>>({});
  
  const [toast, setToast] = useState<string | null>(null);

  // 👇 متغيرات لحفظ حالة التدقيق الخماسية الإلزامية لربط الزر بها
  const [isIdentityVerified, setIsIdentityVerified] = useState(false);
  const [isTitleDeedValid, setIsTitleDeedValid] = useState(false);
  const [isPriceMatched, setIsPriceMatched] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const [isContractReviewed, setIsContractReviewed] = useState(false);

  const uploads: UploadItem[] = [
    { id: "id_card", label: "صورة الهوية الشخصية" },
    { id: "property_doc", label: "وثيقة الملكية / السند العقاري" },
  ];

  // جلب البيانات الحقيقية عند فتح الصفحة وتنظيف مسارات الصور الطويلة
  useEffect(() => {
    async function loadData() {
      if (!propertyId) {
        console.error("خطأ: لم يتم العثور على propertyId في رابط الصفحة");
        setToast("رابط الصفحة غير صحيح أو ناقص.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log("جاري طلب البيانات للعقار رقم:", propertyId);
        
        const result = await getUserContractDetails(propertyId);
        
        if (result?.success && result.data) {
          setFullName(result.data.fullName || "");
          setPhone(result.data.phone || "");
          setOfferPrice(result.data.offerPrice || "");
          setNotes(result.data.notes || "");
          
          // تحديث الحالات المنطقية الحقيقية بناءً على المدخلات من قاعدة البيانات
          setIsIdentityVerified(!!result.data.idCardPath);
          setIsTitleDeedValid(!!result.data.propertyDocPath && result.data.propertyDocPath !== "NOT_PROVIDED");
          setIsPriceMatched(!!result.data.isPriceMatched);
          setIsSigned(!!result.data.isSigned);
          setIsContractReviewed(!!result.data.isContractReviewed);

          // دالة ذكية لفصل الرابط الطويل واستخراج اسم الصورة الأخير فقط بشكل نظيف
         // دالة ذكية لمسح الروابط العشوائية الطويلة واستخراج اسم الصورة الأخير
const extractFileName = (path: string, fallback: string) => {
  if (!path || path === "NOT_PROVIDED") return "";
  
  // 1. فصل مسار الرابط عند علامة الاستفهام إن وجدت للتخلص من البارامترات الطويلة
  const baseUrl = path.split('?')[0];
  
  // 2. استخراج الاسم الأخير للملف الحقيقي بشكل نظيف
  const name = baseUrl.split('/').pop();
  
  return name && name.includes('.') ? name : fallback;
};

          setSelectedFiles({
            id_card: result.data.idCardPath 
              ? [{ name: extractFileName(result.data.idCardPath, "صورة_الهوية.jpg") }] 
              : [],
            property_doc: result.data.propertyDocPath && result.data.propertyDocPath !== "NOT_PROVIDED"
              ? [{ name: extractFileName(result.data.propertyDocPath, "وثيقة_الملكية.pdf") }] 
              : [],
          });
        } else {
          setToast(result?.message || "لم يتم العثور على بيانات حقيقية.");
        }
      } catch (error) {
        console.error("حدث خطأ أثناء الاتصال بالدالة:", error);
        setToast("فشل الاتصال بالسيرفر أثناء جلب البيانات.");
      } finally {
        setLoading(false); 
      }
    }
    loadData();
  }, [propertyId]);

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  // 👇 شرط التحقق الإلزامي: يجب أن تكون جميع البنود الخمسة مساوية لـ true
  const isChecklistComplete = isIdentityVerified && isTitleDeedValid && isPriceMatched && isSigned && isContractReviewed;

  const submitFinal = async () => {
    // خط حماية إضافي في حال تم محاولة الالتفاف على الزر المعطل
    if (!isChecklistComplete) {
      setToast("⚠️ عذراً، لا يمكنك الإرسال حتى تكتمل كافة خطوات وقوائم التحقق.");
      return;
    }

    setToast("جاري إرسال الطلب...");

    try {
      const result = await submitContractRequest({
        propertyId: propertyId, 
        userId: "USER_ID_HERE",
        offerPrice: offerPrice,
        notes: notes,
      });

      if (result?.success) {
        setToast(result.message ?? "تم إرسال طلبك بنجاح وجاري مراجعته!");
        setTimeout(() => {
          router.push("/m/purchase-success");
        }, 2000);
      } else {
        setToast(result?.message ?? "حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مجدداً.");
      }
    } catch (error) {
      setToast("فشل الاتصال بالسيرفر، يرجى المحاولة لاحقاً.");
    }
  };

  if (loading) {
    return (
      <PhoneShell title="مراجعة العقد">
        <div className="flex h-64 flex-col items-center justify-center gap-2 text-slate-500">
          <Loader2 className="h-8 w-8 animate-spin text-[#2e84d6]" />
          <p className="text-sm font-medium">جاري تحميل البيانات الحقيقية...</p>
        </div>
      </PhoneShell>
    );
  }

  return (
    <PhoneShell title="مراجعة العقد">
      <section className="p-4">
        {currentStep === 3 ? (
          <div className="space-y-3">
            <h4 className="text-lg font-extrabold">الخطوة الثالثة: مراجعة البيانات</h4>
            
            {/* كرت البيانات الشخصية والمالية */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm">
              <div className="mb-1 flex items-center justify-between">
                <p className="font-semibold text-slate-500">الاسم الكامل</p>
                <button
                  type="button"
                  onClick={() => goToStep(1)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#2e84d6]"
                >
                  <PencilLine className="h-3.5 w-3.5" />
                  تعديل
                </button>
              </div>
              <p className="font-bold">{fullName || "-"}</p>
              <p className="mt-2 text-slate-600">الهاتف: {phone || "-"}</p>
              <p className="text-slate-600">
                العرض المالي: {offerPrice ? `${Number(offerPrice).toLocaleString()} ل.س `: "-"}
              </p>
              <p className="text-slate-600">الملاحظات: {notes || "لا يوجد"}</p>
            </div>

            {/* كرت الوثائق المرفوعة النظيف */}
            <div className="rounded-xl border border-slate-200 p-3">
              <p className="font-bold">الوثائق المرفوعة</p>
              <div className="mt-2 space-y-1">
                {uploads.map((upload) => (
                  <div key={upload.id} className="rounded-lg bg-slate-50 p-2 text-xs">
                    <p className="font-semibold">{upload.label}</p>
                    {(selectedFiles[upload.id]?.length ?? 0) > 0 ? (
                      <ul className="mt-1 space-y-1 text-emerald-700">
                        {selectedFiles[upload.id]?.map((file) => (
                          <li key={`${upload.id}-${file.name}`} className="truncate font-mono">
                            • {file.name}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-1 text-red-500">لم يتم رفع ملف بعد.</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* أزرار التحكم والإرسال المربوطة شرطياً بحالة الـ Checklist */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"onClick={() => goToStep(2)}
                className="min-h-11 rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-bold text-slate-700 transition hover:bg-slate-50"
              >
                تعديل الوثائق
              </button>
              <button
                type="button"
                onClick={submitFinal}
                disabled={!isChecklistComplete}
                className={`min-h-11 rounded-xl px-4 py-2.5 font-bold text-white transition-all ${
                  isChecklistComplete 
                    ? "bg-emerald-600 hover:bg-emerald-700 active:scale-95 cursor-pointer shadow-md" 
                    : "bg-slate-300 text-slate-500 cursor-not-allowed opacity-75"
                }`}
              >
                إرسال نهائي
              </button>
            </div>
          </div>
        ) : null}

        {/* حقل الملاحظات الإضافية */}
        <label className="mt-4 block text-sm font-semibold text-slate-700" htmlFor="notes">
          ملاحظات إضافية (اختياري)
        </label>
        <textarea
          id="notes"
          rows={3}
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="اكتب أي تفاصيل تريد إضافتها مع الطلب..."
          className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm outline-none ring-[#2e84d6]/30 placeholder:text-slate-400 focus:bg-white focus:ring-2"
        />

        {/* التنبيه الأخضر عند نجاح أو إرسال العملية */}
        {toast ? (
          <div className="mt-3 rounded-xl bg-emerald-50 p-2 text-center text-sm font-medium text-emerald-700 animate-pulse">
            {toast}
          </div>
        ) : null}

        {/* رسالة الحماية أسفل الصفحة */}
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">
          <ShieldCheck className="h-5 w-5 flex-shrink-0" />
          <span>جميع بياناتك محمية ومشفرة ضمن نظام التحقق.</span>
        </div>
      </section>
    </PhoneShell>
  );
}