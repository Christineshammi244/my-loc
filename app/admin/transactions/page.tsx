
"use client";
import Image from "next/image";
import {approveTransaction} from "../../actions/transactionActions";
import {rejectTransaction} from "../../actions/transactionActions";
import {useState,useEffect} from "react";
import {updateChecklist} from "../../actions/transactionActions";
import {getStats} from "../../actions/transactionActions";
import {getRecentTransactions} from "../../actions/transactionActions"
import {getTransactionById} from "../../actions/transactionActions";
import {
  BarChart3,
  Check,
  CheckCircle2,
  ClipboardList,
  Printer,
  XCircle,
} from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { traceProcessWarnings } from "process";
import { StatsFs } from "fs";

const buildingImg =
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80";

export default function TransactionsPage() {
  const [currentTransaction, setCurrentTransaction] = useState({
    id:"cmoxzssu40000uzj8f2c2vqw0",
    userId:"e56d87ad-4b28-4d06-8b20-ebac623cfbc4",
    propertyId: 1,
    isTitleDeedValid: false,
    isIdentityVerified: false,
    status: "PENDING",
    isPriceMatched: false,
    isSigned: false,
    isContractReviewed: false,
    createdAt: new Date().toISOString()
  });
// 1. تعريف الحالة (State) للأرقام
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  // 2. دالة لجلب البيانات وتحديث الحالة (منفصلة عشان نستخدمها بكل مكان)
  const refreshStats = async () => {
    const stats = await getStats();
    setStats(stats);
    const data = await getTransactionById(currentTransaction?.id);
    if (data) setCurrentTransaction(data as any);
  };
  const [searchId, setSearchId] = useState("");
  const handleSearch = async () => {
  if (!searchId) return; // لا تفعل شيئاً إذا كان الحقل فارغاً
  
  const data = await getTransactionById(searchId);
  if (data) {
    setCurrentTransaction(data as any);
    setRecentTransactions([data as any]);
    // يمكنك إضافة منطق هنا لإظهار النتائج أو الانتقال لصفحة المعاملة
  } else {
    alert("المعاملة غير موجودة");
  }
};
const checklistItems = [
  { label: "التحقق من الهوية الشخصية", field: "isIdentityVerified", status: currentTransaction?.isIdentityVerified },
  { label: "التحقق من صك الملكية", field: "isTitleDeedValid", status: currentTransaction?.isTitleDeedValid },
  { label: "مطابقة السعر المتفق عليه", field: "isPriceMatched", status: currentTransaction?.isPriceMatched },
  { label: "توقيع الطلبات والوثائق", field: "isSigned", status: currentTransaction?.isSigned },
  { label: "مراجعة عقد الضمان", field: "isContractReviewed", status: currentTransaction?.isContractReviewed },
];
 // 3. جلب البيانات أول ما تفتح الصفحة
  useEffect(() => {
    refreshStats();
  }, []);
  // هذا السطر بيفحص إذا كل العناصر بـ checklistItems حالتها true
const isChecklistComplete = checklistItems.every(item => item.status === true);

  return (
    <AdminShell 
      activeNav="transactions"
      searchPlaceholder="بحث عن معاملة..."
      searchValue={searchId}
      onSearchChange={(e:any) => setSearchId(e.target.value)}
      onSearchClick={handleSearch} 
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
              value: stats.total.toLocaleString(),
              icon: BarChart3,
              iconBg: "bg-sky-100 text-sky-600",
            },
            {
              label: "طلبات مرفوضة",
              value: stats.rejected.toLocaleString(),
              icon: XCircle,
              iconBg: "bg-red-100 text-red-600",
            },
            {
              label: "موافَق عليها",
              value: stats.approved.toLocaleString(),
              icon: CheckCircle2,
              iconBg: "bg-emerald-100 text-emerald-600",
            },
            {
              label: "قيد الانتظار",
              value: stats.pending.toLocaleString(),
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
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
  <div>
    {/* عرض آخر 4 أرقام من الـ ID الحقيقي */}
    <p className="text-lg font-bold text-slate-900">
      معاملة #TRX-{currentTransaction.id.toString().slice(0,6)}
    </p>
    {/* عرض تاريخ إنشاء المعاملة الحقيقي من الباك أند */}
    <p className="text-sm text-slate-500">
      {(currentTransaction as any)?.createdAt ? 
    new Date((currentTransaction as any).createdAt).toLocaleDateString('ar-SA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }) : 
    "جاري تحميل التاريخ..."}
</p>
  </div>

  {/* حالة المعاملة: لون يتغير حسب الحالة */}
  <span className={`rounded-full px-3 py-1 text-xs font-bold ${
    currentTransaction.status === "COMPLETED" 
    ? "bg-emerald-100 text-emerald-700" 
    : "bg-amber-100 text-amber-700"
  }`}>
    {currentTransaction.status === "COMPLETED" ? "تم تثبيت الملكية" : "بانتظار الموافقة النهائية"}
  </span>
</div>

              <div className="grid gap-4 p-6 md:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
                  <p className="text-xs font-semibold text-slate-500">
                    البائع (المالك الحالي)
                  </p>
                  <p className="mt-2 font-semibold text-slate-900">
                    {(currentTransaction as any)?.user?.name || "بائع غير معروف"}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    البريد:{(currentTransaction as any)?.user?.email || "لا يوجد ايميل"}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {(currentTransaction as any)?.user?.role||"غير متوفر"}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
                  <p className="text-xs font-semibold text-slate-500">
                    المشتري (المالك الجديد)
                  </p>
                  <p className="mt-2 font-semibold text-slate-900">
                    {(currentTransaction as any)?.otherPartyName || "مشتري غير معرف"}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                البريد: {(currentTransaction as any)?.otherPartyId || "لا يوجد بريد المشتري"}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                  {(currentTransaction as any)?.otherPartyAddress || "عنوان غير محدد"}
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
                      {(currentTransaction as any)?.property?.type || "غير متوفر"}
                    </li>
                    <li>
                      <span className="text-slate-400">الموقع: </span>
                      {(currentTransaction as any)?.property?.location || "غير متوفر"}
                    </li>
                    <li>
                      <span className="text-slate-400">المساحة: </span>
                      {(currentTransaction as any)?.property?.area || "غير متوفر"}
                    </li>
                    <li>
                      <span className="text-slate-400">القيمة: </span>
                      {(currentTransaction as any)?.property?.price || "غير متوفر"}
                    </li>
                    <li className="sm:col-span-2">
                      <span className="text-slate-400">حالة الدفع: </span>
                    <span className={`font-medium ${
                        (currentTransaction as any).status === "COMPLETED" 
                  ? "text-emerald-700" 
                  : "text-amber-700"
                    }`}>
                  {(currentTransaction as any).status === "COMPLETED" 
                ? "تم تحويل المبلغ للمالك" 
                    : "محجوز في حساب الضمان"}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="relative aspect-[21/9] overflow-hidden rounded-xl bg-slate-100">
                  <Image
                    src={buildingImg}
                    alt="صورة العقار"
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 px-6 py-4">
                
          <button 
  disabled={(currentTransaction as any).status === "COMPLETED" || !isChecklistComplete} // تعطيل الزر إذا اكتملت المعاملة
  onClick={async () => {
    const res = await approveTransaction(currentTransaction.id, currentTransaction.userId, currentTransaction.propertyId);
    const newStats = await getStats();
    setStats(newStats);
    if (res.success) {
      alert("تمت الموافقة ونقل الملكية بنجاح! 🎉");
      window.location.reload(); // تحديث الصفحة لرؤية الحالة الجديدة
    }
  }}
  className={`p-3 rounded-lg ${(currentTransaction as any).status === "COMPLETED" || !isChecklistComplete ? "bg-gray-400" : "bg-[#2DD4BF] text-white"}`}
>
  {(currentTransaction as any).status === "COMPLETED" ? "تمت الموافقة" : "قبول المعاملة ونقل الملكية"}
</button>
            
              <button 
  onClick={async () => {
    if (confirm("هل أنت متأكد من رفض هذه المعاملة؟")) {
      const result = await rejectTransaction("cmoxzssu40000uzj8f2c2vqw0"); // مرر الـ ID الخاص بالمعاملة
      const newStats = await getStats();
      setStats(newStats);
      if (result.success) {
        alert("تم رفض المعاملة بنجاح ❌");
        window.location.reload();
      }
    }
  }}
  className="text-red-500 text-xs border-b border-red-500 ..." // الكلاسات الأصلية لزر الرفض عندك
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
  {recentTransactions.map((row) => (
    <li
      key={row.id}
      className="flex items-start gap-3 border-b border-slate-100 pb-4 last:border-0"
    >
      {row.status === "COMPLETED" ? (
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
      ) : (
        <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
      )}
      
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-900">
          TRX-{row.id.toString().slice(-4)}#
        </p>
        <p className="text-xs text-slate-500">
          {new Date(row.createdAt).toLocaleDateString('ar-SA')}
        </p>
      </div>
    </li>
  ))}
</ul>
            </section>
<section className="overflow-hidden rounded-2xl bg-[#051327] p-5 text-white shadow-md">
              <h2 className="text-base font-bold">قائمة تدقيق البيانات</h2>
              <ul className="mt-4 space-y-3 text-sm">
  {checklistItems.map((item, i) => (
    <li 
      key={i} 
      className="flex items-center gap-2 cursor-pointer"
      onClick={async () => {
        // استدعاء الدالة التي كتبتها أنت في ملف Actions
        await updateChecklist(currentTransaction.id, item.field, !item.status);
        const newStats = await getStats();
        setStats(newStats);
        setCurrentTransaction({
        ...currentTransaction,
        [item.field]: !item.status});
      }}
    >
      <span className={`flex h-5 w-5 items-center justify-center rounded border ${
        item.status ? "border-emerald-400 bg-emerald-500/20" : "border-white/20 bg-white/5"
      }`}>
        {item.status && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
      </span>
      <span className={item.status ? "" : "text-white/70"}>{item.label}</span>
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