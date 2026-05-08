import Image from "next/image";
import {
  BarChart3,
  Check,
  CheckCircle2,
  ClipboardList,
  Printer,
  XCircle,
} from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";

const buildingImg =
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80";

export default function TransactionsPage() {
  return (
    <AdminShell
      activeNav="transactions"
      searchPlaceholder="بحث عن معاملة..."
    >
      <div className="mx-auto max-w-[1400px] space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            الموافقة على المعاملات
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            راجع بيانات البائع والمشتري والعقار قبل اعتماد نقل الملكية ضمن الضمان
            القانوني.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "إجمالي العمليات",
              value: "1,515",
              icon: BarChart3,
              iconBg: "bg-sky-100 text-sky-600",
            },
            {
              label: "طلبات مرفوضة",
              value: "89",
              icon: XCircle,
              iconBg: "bg-red-100 text-red-600",
            },
            {
              label: "موافَق عليها",
              value: "1,402",
              icon: CheckCircle2,
              iconBg: "bg-emerald-100 text-emerald-600",
            },
            {
              label: "قيد الانتظار",
              value: "24",
              icon: ClipboardList,
              iconBg: "bg-indigo-100 text-indigo-600",
            },
          ].map((card) => (
            <div
              key={card.label}
              className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.iconBg}`}
              >
                <card.icon className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-sm text-slate-500">{card.label}</p>
                <p className="text-2xl font-bold tabular-nums text-slate-900">
                  {card.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-6 py-4">
                <div>
                  <p className="text-lg font-bold text-slate-900">
                    معاملة #TRX-9928
                  </p>
                  <p className="text-sm text-slate-500">24 مايو 2024</p>
                </div>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                  بانتظار الموافقة النهائية
                </span>
              </div>

              <div className="grid gap-4 p-6 md:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
                  <p className="text-xs font-semibold text-slate-500">
                    البائع (المالك الحالي)
                  </p>
                  <p className="mt-2 font-semibold text-slate-900">
                    سامر الحسن
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    الهوية: 01234567890
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    العنوان: دمشق، المزة
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
                  <p className="text-xs font-semibold text-slate-500">
                    المشتري (المالك الجديد)
                  </p>
                  <p className="mt-2 font-semibold text-slate-900">
                    لينا يوسف
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    الهوية: 01987654321
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    العنوان: دمشق، أبو رمانة
                  </p>
                </div>
              </div>

              <div className="space-y-4 px-6 pb-6">
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    تفاصيل العقار
                  </p>
                  <ul className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                    <li>
                      <span className="text-slate-400">النوع: </span>
                      شقة سكنية
                    </li>
                    <li>
                      <span className="text-slate-400">الموقع: </span>
                      دمشق
                    </li>
                    <li>
                      <span className="text-slate-400">المساحة: </span>
                      145 م²
                    </li>
                    <li>
                      <span className="text-slate-400">القيمة: </span>
                      850,000,000 ل.س
                    </li>
                    <li className="sm:col-span-2">
                      <span className="text-slate-400">حالة الدفع: </span>
                      <span className="font-medium text-emerald-700">
                        محجوز في حساب الضمان
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="relative aspect-[21/9] overflow-hidden rounded-xl bg-slate-100">
                  <Image
                    src={buildingImg}
                    alt="صورة العقار"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 px-6 py-4">
                <button
                  type="button"
                  className="inline-flex flex-1 min-w-[200px] items-center justify-center rounded-xl bg-[#00A76F] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#009660]"
                >
                  قبول المعاملة واعتماد النقل
                </button>
                <button
                  type="button"
                  className="inline-flex flex-1 min-w-[200px] items-center justify-center rounded-xl border-2 border-red-200 bg-white px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  رفض الطلب مع ذكر السبب
                </button>
                <button
                  type="button"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
                  aria-label="طباعة"
                >
                  <Printer className="h-5 w-5" strokeWidth={1.75} />
                </button>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <h2 className="text-base font-bold text-slate-900">
                سجل العمليات السابقة
              </h2>
              <ul className="mt-4 space-y-4">
                {[
                  { id: "#TRX-9925", time: "منذ ساعتين", ok: true },
                  { id: "#TRX-9921", time: "منذ 5 ساعات", ok: false },
                  { id: "#TRX-9918", time: "أمس", ok: true },
                  { id: "#TRX-9912", time: "أمس", ok: true },
                ].map((row) => (
                  <li
                    key={row.id}
                    className="flex items-start gap-3 border-b border-slate-100 pb-4 last:border-0 last:pb-0"
                  >
                    {row.ok ? (
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                    ) : (
                      <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-slate-900">{row.id}</p>
                      <p className="text-xs text-slate-500">{row.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="overflow-hidden rounded-2xl bg-[#051327] p-5 text-white shadow-md">
              <h2 className="text-base font-bold">قائمة تدقيق البيانات</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {[
                  "التحقق من سند الملكية",
                  "مطابقة بصمة البائع",
                  "التحقق من الهوية الشخصية للطرفين",
                  "مراجعة عقد الضمان",
                  "توقيع الطلبات أمام الكاتب العدل",
                ].map((label, i) => (
                  <li key={label} className="flex items-center gap-2">
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded border ${
                        i < 3
                          ? "border-emerald-400 bg-emerald-500/20 text-emerald-300"
                          : "border-white/20 bg-white/5"
                      }`}
                    >
                      {i < 3 ? (
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      ) : null}
                    </span>
                    <span className={i < 3 ? "" : "text-white/70"}>{label}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-white/10 pt-4 text-xs leading-relaxed text-white/55">
                ملاحظة النظام: يتم حفظ حالة التدقيق تلقائياً مع كل خطوة موافقة،
                ولا يمكن إتمام النقل قبل إكمال البنود الإلزامية.
              </p>
            </section>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
