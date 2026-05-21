"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { 
  BarChart3, Check, CheckCircle2, ClipboardList, 
  Printer, XCircle, User, MapPin, Building2, Search 
} from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { getRecentTransactions } from "../../actions/transactionActions";
import { 
  approveTransaction, rejectTransaction, updateChecklist, 
  getStats, getTransactionById 
} from "../../actions/transactionActions";

const buildingImg = "https://unsplash.com";

export default function TransactionsPage() {
  const [currentTransaction, setCurrentTransaction] = useState<any>(null);
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [searchId, setSearchId] = useState("");
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // المكونات الفرعية معرفة داخلياً لمنع أخطاء التداخل والعزل الهيكلي
  function StatCard({ label, value, icon: Icon, color }: any) {
    const styles: any = { blue: "bg-blue-50 text-blue-600", red: "bg-red-50 text-red-600", emerald: "bg-emerald-50 text-emerald-600", amber: "bg-amber-50 text-amber-600" };
    return (
      <div className="bg-white p-5 rounded-2xl border flex justify-between items-center shadow-sm">
        <div className="text-right">
          <p className="text-[10px] font-bold text-slate-400 uppercase">{label}</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{value ? value.toLocaleString() : 0}</p>
        </div>
        <div className={`p-3.5 rounded-xl ${styles[color]}`}><Icon size={24}/></div>
      </div>
    );
  }

  function PartyInfo({ type, name }: any) {
    const isSeller = type === 'seller';
    return (
      <div className={`p-4 rounded-2xl border-2 text-right ${isSeller ? 'bg-blue-50/50 border-blue-100' : 'bg-emerald-50/50 border-emerald-100'}`}>
        <p className={`text-[10px] font-black uppercase ${isSeller ? 'text-blue-600' : 'text-emerald-600'}`}>
          {isSeller ? 'البائع (المالك الحالي)' : 'المشتري (المالك الجديد)'}
        </p>
        <p className="text-sm font-bold mt-1 text-slate-900">{name || "غير محدد"}</p>
        <p className="text-[11px] text-slate-400 mt-1 flex items-center justify-end gap-1"><MapPin size={10}/> dمشق، سوريا</p>
      </div>
    );
  }

  function Detail({ label, value }: any) {
    return (
      <div className="text-right border-r-2 border-slate-50 pr-4">
        <span className="text-[10px] font-bold text-slate-400 uppercase">{label}</span>
        <p className="text-sm font-bold text-slate-700">{value || "---"}</p>
      </div>
    );
  }

  const loadData = async () => {
    try {
      setLoading(true);
      const s = await getStats();
      setStats(s);

      const recent = await getRecentTransactions();
      setRecentTransactions(recent);
      if (recent && recent.length > 0) {
        setCurrentTransaction(recent[0]);
      }
    } catch (error) {
      console.error("Error loading admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const toggleItem = async (field: string, currentVal: boolean) => {
    if (!currentTransaction) return;
    const newVal = !currentVal;
    
    setCurrentTransaction({ ...currentTransaction, [field]: newVal });

    const res = await updateChecklist(currentTransaction.id, field, newVal);
    if (!res || !res.success) {
      setCurrentTransaction({ ...currentTransaction, [field]: currentVal });
      alert("فشل التحديث، يرجى المحاولة لاحقاً");
    }
  };

  if (loading) return <div className="p-10 text-center font-bold text-slate-500">جاري تحميل البيانات من السيرفر...</div>;
  if (!currentTransaction) return <div className="p-10 text-center font-bold text-slate-500">لا توجد معاملات متاحة حالياً.</div>;

  const checklist = [
    { label: "التحقق من الهوية الشخصية", field: "isIdentityVerified", val: currentTransaction.isIdentityVerified },{ label: "التحقق من صك الملكية", field: "isTitleDeedValid", val: currentTransaction.isTitleDeedValid },
    { label: "مطابقة السعر المتفق عليه", field: "isPriceMatched", val: currentTransaction.isPriceMatched },
    { label: "توقيع الطلبات والوثائق", field: "isSigned", val: currentTransaction.isSigned },
    { label: "مراجعة عقد الضمان", field: "isContractReviewed", val: currentTransaction.isContractReviewed },
  ];

  const canApprove = checklist.every(i => i.val === true  ||(i.val as any) === "true"||  (i.val as any) === 1);

  return (
    <AdminShell activeNav="transactions" searchValue={searchId} onSearchChange={(e: any) => setSearchId(e.target.value)} searchPlaceholder="ابحث عن العقارات">
      <div className="mx-auto max-w-[1400px] space-y-6 pb-10 px-4" dir="rtl">
        
        <header>
          <h1 className="text-2xl font-black text-slate-900">الموافقة على المعاملات</h1>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="إجمالي العمليات" value={stats.total} icon={BarChart3} color="blue" />
            <StatCard label="طلبات مرفوضة" value={stats.rejected} icon={XCircle} color="red" />
            <StatCard label="تمت الموافقة" value={stats.approved} icon={CheckCircle2} color="emerald" />
            <StatCard label="طلبات معلقة" value={stats.pending} icon={ClipboardList} color="amber" />
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          <main className="lg:col-span-2 space-y-6">
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="flex justify-between items-center px-6 py-5 border-b bg-slate-50/50 text-right">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">معاملة #TRX-{currentTransaction?.id?.toString()?.slice(0, 6) || "------"}</h2>
                  <p className="text-xs text-slate-400">تاريخ الطلب: {new Date(currentTransaction.createdAt).toLocaleDateString('ar-SA')}</p>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${currentTransaction.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {currentTransaction.status === 'COMPLETED' ? 'مكتملة' : 'بانتظار التدقيق'}
                </span>
              </div>

              <div className="p-6 grid md:grid-cols-2 gap-4">
                <PartyInfo type="seller" name={currentTransaction?.user?.name || "اسم المشتري"} />
                <PartyInfo type="buyer" name={currentTransaction?.otherPartyName || "اسم البائع"} />
              </div>

              <div className="px-6 pb-6 flex flex-col md:flex-row gap-6 text-right">
                <div className="relative w-full md:w-1/3 aspect-[4/3] rounded-2xl overflow-hidden border">
                  <img src={buildingImg} alt="property" className="object-cover w-full h-full" />
                </div>
                <div className="flex-1 grid grid-cols-2 gap-y-4">
                  <Detail label="نوع العقار" value={currentTransaction?.property?.type || "---"} />
                  <Detail label="المساحة" value={currentTransaction?.property?.area ? `${currentTransaction.property.area} ²م `: "--"} />
                  <Detail label="الموقع" value={currentTransaction?.property?.location || "---"} />
                  <div className="col-span-2">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">قيمة الصفقة</span>
                    <b className="text-2xl font-black text-blue-600">
                      {Number(currentTransaction?.property?.price || 0).toLocaleString()} 
                      <span className="text-sm font-normal text-slate-400 mr-1">ل.س</span>
                    </b>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t bg-slate-50/50 flex justify-between items-center">
                <div className="flex gap-3">
                  <button 
                  disabled={!canApprove || currentTransaction.status === 'COMPLETED'}
                    onClick={() => approveTransaction(currentTransaction.id)}
                    className={`px-10 py-3.5 rounded-xl font-black text-sm shadow-md transition-all ${(!canApprove || currentTransaction.status === 'COMPLETED') ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95 cursor-pointer'}`}
                  >
                    {currentTransaction.status === 'COMPLETED' ? 'تم اعتماد النقل' : 'اعتماد ونقل الملكية'}
                  </button>

                  <button className="px-6 py-3.5 border-2 border-red-50 text-red-600 font-bold rounded-xl hover:bg-red-50 text-sm">رفض الطلب</button>
                </div>
                <button className="p-3 border rounded-xl bg-white shadow-sm text-slate-400 hover:bg-slate-50"><Printer size={22}/></button>
              </div>
            </section>
          </main>

          <aside className="space-y-6">
            <section className="bg-[#051327] p-6 rounded-2xl text-white shadow-2xl ring-1 ring-white/10">
              <h3 className="font-bold mb-6 flex items-center gap-2 text-sm text-right justify-end">
                <ClipboardList className="text-blue-400" size={18}/> قائمة تدقيق البيانات
              </h3>
              <div className="space-y-4 text-right">
                {checklist.map((item, idx) => (
                  <div key={idx} onClick={() => toggleItem(item.field, !!item.val)} className="flex items-center justify-end gap-3 cursor-pointer group">
                    <span className={`text-[13px] ${item.val ? 'text-white font-medium' : 'text-white/40 group-hover:text-white/70'}`}>
                      {item.label}
                    </span>
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${item.val ? 'bg-emerald-500 border-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.4)]' : 'border-white/10 bg-white/5'}`}>
                      {item.val && <Check size={12} strokeWidth={4} />}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </AdminShell>
  );
}