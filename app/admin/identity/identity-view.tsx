"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type RequestItem = {
  id: string;
  name: string;
  location: string;
  role: string;
  roleVariant: "seller" | "neutral";
  idType: string;
  idVariant: "personal" | "passport";
  time: string;
};

const requests: RequestItem[] = [
  {
    id: "1",
    name: "محمد الأحمد",
    location: "دمشق، المزة",
    role: "بائع عقاري",
    roleVariant: "seller",
    idType: "هوية شخصية",
    idVariant: "personal",
    time: "منذ 10 دقائق",
  },
  {
    id: "2",
    name: "سارة القادري",
    location: "حلب، الأعظمية",
    role: "معلن",
    roleVariant: "neutral",
    idType: "جواز سفر",
    idVariant: "passport",
    time: "منذ ساعة",
  },
  {
    id: "3",
    name: "خالد منصور",
    location: "اللاذقية",
    role: "بائع عقاري",
    roleVariant: "seller",
    idType: "هوية شخصية",
    idVariant: "personal",
    time: "منذ 3 ساعات",
  },
];

const tabs = [
  { key: "new", label: "الطلبات الجديدة", count: 12 },
  { key: "review", label: "قيد المراجعة", count: null },
  { key: "rejected", label: "المرفوضة", count: null },
  { key: "done", label: "المكتملة", count: null },
] as const;

export function IdentityView() {
  const [tab, setTab] = useState<(typeof tabs)[number]["key"]>("new");
  const [selectedId, setSelectedId] = useState(requests[0]?.id ?? "");

  const selected = requests.find((r) => r.id === selectedId) ?? requests[0];

  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">التحقق من الهوية</h1>
        <p className="mt-1 text-sm text-slate-500">
          مراجعة طلبات التوثيق الجديدة لضمان موثوقية المعلنين.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold transition",
              tab === t.key
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50",
            )}
          >
            {t.label}
            {t.count != null ? (
              <span className="mr-1 text-xs opacity-80">({t.count})</span>
            ) : null}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <section className="lg:col-span-5">
          <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="text-base font-bold text-slate-900">
                قائمة الطلبات الواردة
              </h2>
            </div>
            <ul className="divide-y divide-slate-100 p-3">
              {requests.map((r) => (
                <li key={r.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(r.id)}
                    className={cn(
                      "w-full rounded-xl px-3 py-3 text-right transition",
                      selectedId === r.id
                        ? "bg-sky-50 ring-1 ring-sky-200"
                        : "hover:bg-slate-50",
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-slate-900">{r.name}</p>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                          r.idVariant === "personal"
                            ? "bg-sky-100 text-sky-800"
                            : "bg-violet-100 text-violet-800",
                        )}
                      >
                        {r.idType}
                      </span>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                          r.roleVariant === "seller"
                            ? "bg-amber-100 text-amber-900"
                            : "bg-slate-100 text-slate-700",
                        )}
                      >
                        {r.role}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{r.location}</p>
                    <p className="mt-1 text-xs text-slate-400">{r.time}</p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="lg:col-span-7">
          <div className="space-y-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-xl font-bold text-slate-500">
                م
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900">
                    {selected?.name}
                  </h3>
                  <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-900">
                    قيد المراجعة
                  </span>
                </div>
                <div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                  <p>
                    <span className="text-slate-400">البريد: </span>
                    m.alahmad@example.sy
                  </p>
                  <p>
                    <span className="text-slate-400">تاريخ الانضمام: </span>
                    12 أكتوبر 2023
                  </p>
                  <p>
                    <span className="text-slate-400">الهاتف: </span>
                    +963 944 123 456
                  </p>
                  <p>
                    <span className="text-slate-400">الموقع: </span>
                    دمشق، سوريا
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-base font-bold text-slate-900">
                الوثائق المرفوعة للمراجعة
              </h4>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                  <p className="border-b border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600">
                    الوجه الأمامي للهوية الشخصية
                  </p>
                  <div className="aspect-[1.6/1] bg-gradient-to-br from-slate-200 to-slate-300" />
                </div>
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                  <p className="border-b border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600">
                    الوجه الخلفي للهوية الشخصية
                  </p>
                  <div className="aspect-[1.6/1] bg-gradient-to-br from-slate-300 to-slate-400" />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="notes"
                className="text-sm font-semibold text-slate-800"
              >
                ملاحظات المشرف (تظهر للمستخدم في حال الرفض):
              </label>
              <textarea
                id="notes"
                rows={4}
                placeholder="اكتب سبب الرفض أو ملاحظات إضافية هنا..."
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none ring-sky-500/30 transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-2"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-xl bg-[#2563eb] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600"
              >
                اعتماد التوثيق
              </button>
              <button
                type="button"
                className="rounded-xl border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
              >
                رفض الطلب
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
