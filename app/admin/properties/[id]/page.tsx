import Image from "next/image";
import Link from "next/link";
import {
  Bath,
  BedDouble,
  Building,
  Check,
  ChevronLeft,
  Download,
  Ruler,
} from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";

const heroImg =
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80";
const thumbs = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80",
];
const mapPlaceholder =
  "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80";

type PageProps = { params: Promise<{ id: string }> };

export default async function PropertyDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <AdminShell
      activeNav="properties"
      searchPlaceholder="البحث عن عقار أو مستخدم..."
    >
      <div className="mx-auto max-w-[1400px] space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 space-y-3">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <Link href="/admin/transactions" className="hover:text-slate-800">
                الرئيسية
              </Link>
              <ChevronLeft className="h-4 w-4 rotate-180 text-slate-400" />
              <span>العقارات المعلقة</span>
              <ChevronLeft className="h-4 w-4 rotate-180 text-slate-400" />
              <span className="font-medium text-slate-800">
                تفاصيل العقار #{id}
              </span>
            </nav>
            <div>
              <h1 className="text-2xl font-bold leading-snug text-slate-900 md:text-3xl">
                فيلا فاخرة للبيع - تنظيم كفرسوسة
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <span>بواسطة: محمد خالد</span>
                <span className="hidden sm:inline">·</span>
                <span>28 مايو 2024</span>
                <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-900">
                  قيد المراجعة
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded-xl bg-[#2563eb] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600"
            >
              الموافقة والنشر
            </button>
            <button
              type="button"
              className="rounded-xl border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              رفض الإعلان
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <h2 className="text-base font-bold text-slate-900">
                  معرض الصور (6)
                </h2>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563eb] hover:underline"
                >
                  <Download className="h-4 w-4" />
                  تحميل الكل
                </button>
              </div>
              <div className="p-5">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-100">
                  <Image
                    src={heroImg}
                    alt="صورة رئيسية للعقار"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority
                  />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {thumbs.map((src, i) => (
                    <div
                      key={src}
                      className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-100 ring-2 ring-transparent transition hover:ring-[#2563eb]/40"
                    >
                      <Image
                        src={src}
                        alt={`صورة ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="200px"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <h2 className="text-base font-bold text-slate-900">
                المواصفات الفنية
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { icon: Ruler, label: "المساحة", value: "450 م²" },
                  { icon: BedDouble, label: "غرف النوم", value: "5 غرف" },
                  { icon: Bath, label: "الحمامات", value: "4 حمامات" },
                  { icon: Building, label: "الطابق", value: "أرضي + 1" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-slate-100 bg-slate-50/80 p-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-100 text-[#2563eb]">
                      <item.icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <p className="mt-3 text-xs text-slate-500">{item.label}</p>
                    <p className="text-sm font-bold text-slate-900">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-7 text-slate-600">
                فيلا مستقلة بطراز معاصر، واجهات زجاجية واسعة، مدخل مزدوج، حديقة
                خاصة وبئر ارتوازي. تشطيبات فاخرة، عزل حراري، ونظام أمني متكامل.
                مناسبة للسكن العائلي أو الاستثمار طويل الأمد.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "حديقة خاصة",
                  "بئر ارتوازي",
                  "موقف سيارات",
                  "نظام طاقة شمسية",
                  "غرفة خادمة",
                  "شرفة مطلة",
                ].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 text-[#2563eb]">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {f}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="overflow-hidden rounded-2xl bg-[#051327] p-6 text-white shadow-md">
              <p className="text-sm text-white/70">السعر المطلوب</p>
              <p className="mt-2 text-3xl font-bold tabular-nums">
                3,200,000,000 ل.س
              </p>
              <div className="my-4 h-px bg-white/15" />
              <p className="text-sm text-white/65">
                سعر المتر التقريبي:{" "}
                <span className="font-semibold text-white">7,111,111 ل.س</span>
              </p>
            </section>

            <section className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-5 py-4">
                <h2 className="text-base font-bold text-slate-900">
                  الموقع الجغرافي
                </h2>
              </div>
              <div className="relative aspect-[16/11] bg-slate-100">
                <Image
                  src={mapPlaceholder}
                  alt="خريطة تقريبية"
                  fill
                  className="object-cover"
                  sizes="400px"
                />
              </div>
              <dl className="space-y-2 px-5 py-4 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">المدينة</dt>
                  <dd className="font-semibold text-slate-900">دمشق</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">المنطقة</dt>
                  <dd className="font-semibold text-slate-900">كفرسوسة</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">نوع العقار</dt>
                  <dd className="font-semibold text-slate-900">سكني - فيلا</dd>
                </div>
              </dl>
            </section>

            <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <h2 className="text-base font-bold text-slate-900">بيانات المعلن</h2>
              <div className="mt-4 flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-600 text-sm font-bold text-white">
                  م
                </div>
                <div>
                  <p className="font-bold text-slate-900">محمد خالد المصري</p>
                  <p className="text-xs text-slate-500">انضم في يناير 2022</p>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <p>
                  الهاتف:{" "}
                  <span className="font-mono text-slate-800">+963 93••••••</span>{" "}
                  <button
                    type="button"
                    className="text-[#2563eb] font-semibold hover:underline"
                  >
                    إظهار
                  </button>
                </p>
                <p>
                  البريد:{" "}
                  <span className="text-slate-800">m.khaled@example.sy</span>
                </p>
              </div>
              <p className="mt-4 text-xs text-slate-500">
                تاريخ آخر إعلانات المستخدم:{" "}
                <span className="font-semibold text-slate-700">
                  3 إعلانات مقبولة
                </span>
              </p>
              <button
                type="button"
                className="mt-4 text-sm font-semibold text-[#2563eb] hover:underline"
              >
                عرض السجل الكامل للمعلن
              </button>
            </section>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
