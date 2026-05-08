"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import {
  Check,
  ChevronRight,
  FileImage,
  FileText,
  PencilLine,
  Phone,
  ShieldCheck,
  Upload,
} from "lucide-react";
import { PhoneShell } from "@/components/mobile/phone-shell";

type UploadItem = {
  id: string;
  label: string;
  accept: string;
  hint: string;
};

const uploads: UploadItem[] = [
  {
    id: "ownership",
    label: "سند الملكية الأصلي",
    accept: ".pdf,.jpg,.jpeg,.png",
    hint: "PDF أو صورة واضحة للوثيقة",
  },
  {
    id: "id",
    label: "الهوية الشخصية",
    accept: ".pdf,.jpg,.jpeg,.png",
    hint: "صورة أمامية وخلفية أو ملف PDF",
  },
  {
    id: "clearance",
    label: "براءة ذمة مالية",
    accept: ".pdf,.jpg,.jpeg,.png",
    hint: "وثيقة صالحة خلال آخر 30 يوم",
  },
];

const propertyImage =
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80";

export default function ContractDetailsPage() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<Record<string, File[]>>({});
  const [notes, setNotes] = useState("");
  const [toast, setToast] = useState("");
  const [finalized, setFinalized] = useState(false);
  const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});

  function onChooseFile(docId: string) {
    fileInputs.current[docId]?.click();
  }

  function onFileChange(docId: string, files: FileList | null) {
    if (!files || files.length === 0) return;
    setSelectedFiles((prev) => ({ ...prev, [docId]: Array.from(files) }));
    setToast("تم اختيار الملفات بنجاح.");
  }

  const uploadedCount = Object.values(selectedFiles).reduce(
    (sum, files) => sum + files.length,
    0,
  );
  const stepOneValid =
    fullName.trim().length >= 4 &&
    phone.trim().length >= 8 &&
    offerPrice.trim().length >= 3 &&
    acceptedTerms;
  const allDocsUploaded = uploads.every(
    (upload) => (selectedFiles[upload.id]?.length ?? 0) > 0,
  );

  const steps = useMemo(
    () => [
      { id: 1 as const, title: "بيانات الطلب" },
      { id: 2 as const, title: "رفع الوثائق" },
      { id: 3 as const, title: "المراجعة والإرسال" },
    ],
    [],
  );

  function goToStep(target: 1 | 2 | 3) {
    setCurrentStep(target);
    setToast("");
  }

  function nextFromStepOne() {
    if (!stepOneValid) {
      setToast("يرجى تعبئة الاسم ورقم الهاتف والعرض المالي والموافقة على الشروط.");
      return;
    }
    setCurrentStep(2);
    setToast("ممتاز، الآن قم برفع الوثائق المطلوبة.");
  }

  function nextFromStepTwo() {
    if (!allDocsUploaded) {
      setToast("يرجى رفع جميع الوثائق قبل الانتقال للخطوة التالية.");
      return;
    }
    setCurrentStep(3);
    setToast("تم حفظ الملفات. راجع الطلب ثم أرسل بشكل نهائي.");
  }

  function submitFinal() {
    setFinalized(true);
    setToast("تم إرسال طلب الشراء بنجاح، وستتم مراجعته من الإدارة.");
  }

  function formatPriceInput(value: string) {
    const digitsOnly = value.replace(/[^\d]/g, "");
    if (!digitsOnly) return "";
    return Number(digitsOnly).toLocaleString("en-US");
  }

  return (
    <PhoneShell title="تفاصيل طلب عقد">
      <section className="rounded-2xl bg-white p-3 shadow-sm">
        <div className="mb-3 rounded-xl bg-blue-50 p-2 text-sm font-semibold text-[#2e84d6]">
          {finalized ? "الحالة: تم إرسال الطلب بنجاح" : `الخطوة الحالية: ${steps[currentStep - 1].title}`}
        </div>

        <div className="mb-4 flex items-center gap-2">
          {steps.map((step, idx) => {
            const isDone = currentStep > step.id || finalized;
            const isActive = currentStep === step.id && !finalized;
            return (
              <div key={step.id} className="flex min-w-0 flex-1 items-center gap-2">
                <button
                  type="button"
                  onClick={() => goToStep(step.id)}
                  className={`inline-flex min-h-8 min-w-8 items-center justify-center rounded-full border text-xs font-bold ${
                    isDone
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : isActive
                        ? "border-[#2e84d6] bg-[#2e84d6] text-white"
                        : "border-slate-300 bg-white text-slate-500"
                  }`}
                >
                  {isDone ? <Check className="h-3.5 w-3.5" /> : step.id}
                </button>
                <span className={`truncate text-xs ${isActive ? "font-bold text-slate-900" : "text-slate-500"}`}>
                  {step.title}
                </span>
                {idx < steps.length - 1 ? <ChevronRight className="h-4 w-4 shrink-0 text-slate-300" /> : null}
              </div>
            );
          })}
        </div>

        {currentStep === 1 ? (
          <div className="space-y-3">
            <article className="rounded-xl border border-slate-200 p-2.5">
              <div className="relative h-40 overflow-hidden rounded-lg">
                <Image src={propertyImage} alt="ملخص العقار" fill className="object-cover" />
              </div>
              <h3 className="mt-2 text-lg font-extrabold">مكتب تجاري في كفرسوسة</h3>
              <p className="text-sm text-slate-500">دمشق - كفرسوسة</p>
              <p className="mt-1 text-xl font-extrabold text-[#2e84d6]">500,000,000 ل.س</p>
            </article>

            <div className="rounded-xl border border-slate-200 p-3">
              <label className="mb-1 block text-sm font-semibold text-slate-700">الاسم الكامل</label>
              <input
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="أدخل الاسم الكامل"
                className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm outline-none ring-[#2e84d6]/30 focus:bg-white focus:ring-2"
              />

              <label className="mb-1 mt-3 block text-sm font-semibold text-slate-700">رقم الهاتف</label>
              <div className="relative">
                <Phone className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="+963 9XX XXX XXX"
                  className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pr-9 pl-3 text-sm outline-none ring-[#2e84d6]/30 focus:bg-white focus:ring-2"
                />
              </div>

              <label className="mb-1 mt-3 block text-sm font-semibold text-slate-700">العرض المالي</label>
              <input
                value={offerPrice}
                onChange={(event) => setOfferPrice(formatPriceInput(event.target.value))}
                placeholder="مثال: 480,000,000"
                className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm outline-none ring-[#2e84d6]/30 focus:bg-white focus:ring-2"
              />

              <label className="mt-3 flex items-start gap-2 rounded-lg bg-slate-50 p-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(event) => setAcceptedTerms(event.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#2e84d6] focus:ring-[#2e84d6]/40"
                />
                <span>أوافق على الشروط والأحكام وأتحمل مسؤولية صحة البيانات المقدمة.</span>
              </label>

              <button
                type="button"
                onClick={nextFromStepOne}
                className="mt-3 min-h-11 w-full rounded-xl bg-[#24a2de] px-4 py-2.5 font-bold text-white transition hover:bg-[#188fc8]"
              >
                متابعة إلى رفع الوثائق
              </button>
            </div>
          </div>
        ) : null}

        {currentStep === 2 ? (
          <div>
            <h4 className="text-lg font-extrabold">الخطوة الثانية: إرسال الوثائق</h4>
            <div className="mt-2 space-y-2">
              {uploads.map((upload) => (
                <div key={upload.id} className="rounded-xl border border-slate-200 p-3">
                  <div className="mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-slate-500" />
                    <p className="font-bold">{upload.label}</p>
                  </div>
                  <p className="text-xs text-slate-500">{upload.hint}</p>

                  <input
                    ref={(el) => {
                      fileInputs.current[upload.id] = el;
                    }}
                    type="file"
                    accept={upload.accept}
                    multiple
                    className="hidden"
                    onChange={(event) => onFileChange(upload.id, event.target.files)}
                  />

                  <button
                    type="button"
                    onClick={() => onChooseFile(upload.id)}
                    className="mt-2 inline-flex min-h-10 items-center gap-2 rounded-lg bg-slate-100 px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e84d6]/35"
                  >
                    <Upload className="h-4 w-4" />
                    اختيار ملفات/صور
                  </button>

                  {(selectedFiles[upload.id]?.length ?? 0) > 0 ? (
                    <div className="mt-2 space-y-1">
                      {selectedFiles[upload.id]?.map((file) => (
                        <div
                          key={`${upload.id}-${file.name}`}
                          className="flex items-center gap-2 rounded-lg bg-emerald-50 px-2 py-1 text-xs text-emerald-700"
                        >
                          <FileImage className="h-3.5 w-3.5" />
                          <span className="truncate">{file.name}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-xl bg-slate-100 p-2 text-xs text-slate-600">
              الملفات المرفوعة: {uploadedCount}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => goToStep(1)}
                className="min-h-11 rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-bold text-slate-700 transition hover:bg-slate-50"
              >
                رجوع
              </button>
              <button
                type="button"
                onClick={nextFromStepTwo}
                disabled={!allDocsUploaded}
                className="min-h-11 rounded-xl bg-[#24a2de] px-4 py-2.5 font-bold text-white transition hover:bg-[#188fc8] disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                متابعة للمراجعة
              </button>
            </div>
          </div>
        ) : null}

        {currentStep === 3 ? (
          <div className="space-y-3">
            <h4 className="text-lg font-extrabold">الخطوة الثالثة: مراجعة البيانات</h4>
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
              <p className="text-slate-600">العرض المالي: {offerPrice ? `${offerPrice} ل.س` : "-"}</p>
              <p className="text-slate-600">الملاحظات: {notes || "لا يوجد"}</p>
            </div>

            <div className="rounded-xl border border-slate-200 p-3">
              <p className="font-bold">الوثائق المرفوعة</p>
              <div className="mt-2 space-y-1">
                {uploads.map((upload) => (
                  <div key={upload.id} className="rounded-lg bg-slate-50 p-2 text-xs">
                    <p className="font-semibold">{upload.label}</p>
                    {(selectedFiles[upload.id]?.length ?? 0) > 0 ? (
                      <ul className="mt-1 space-y-1 text-emerald-700">
                        {selectedFiles[upload.id]?.map((file) => (
                          <li key={`${upload.id}-${file.name}`} className="truncate">
                            • {file.name}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-1 text-red-500">لم يتم رفع ملف.</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => goToStep(2)}
                className="min-h-11 rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-bold text-slate-700 transition hover:bg-slate-50"
              >
                تعديل الوثائق
              </button>
              <button
                type="button"
                onClick={submitFinal}
                className="min-h-11 rounded-xl bg-emerald-600 px-4 py-2.5 font-bold text-white transition hover:bg-emerald-700"
              >
                إرسال نهائي
              </button>
            </div>
          </div>
        ) : null}

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

        {toast ? (
          <div className="mt-3 rounded-xl bg-emerald-50 p-2 text-sm font-medium text-emerald-700">
            {toast}
          </div>
        ) : null}

        <div className="mt-3 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">
          <ShieldCheck className="mb-1 h-4 w-4" />
          جميع بياناتك محمية ومشفرة ضمن نظام التحقق.
        </div>
      </section>
    </PhoneShell>
  );
}
