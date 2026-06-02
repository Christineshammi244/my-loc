"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { 
  BedDouble, Bath, Square, MapPin, Ruler, Building, 
  ChevronRight, AlertTriangle, Loader2, Clock, Phone, Tag, CheckCircle, Eye
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  useEffect(() => {
    async function fetchProperty() {
      try {
        const id = (params.id as string).replace(/\D/g, "");
        const res = await fetch(`/api/properties/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProperty(data);
        }
      } catch (error) { console.error(error); } finally { setLoading(false); }
    }
    fetchProperty();
  }, [params.id]);

  const handleUpdateStatus = async (newStatus: string) => {
    setUpdating(true);
    try {
      const id = (params.id as string).replace(/\D/g, "");
      const res = await fetch(`/api/properties/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        const updated = await res.json();
        setProperty(updated);
        setShowRejectModal(false);
        router.refresh();
      }
    } catch (error) { alert("حدث خطأ في التحديث"); } finally { setUpdating(false); }
  };

  if (loading) return <div className="flex h-screen items-center justify-center bg-slate-50"><Loader2 className="animate-spin text-blue-500" size={40} /></div>;
  if (!property) return <div className="text-center p-20 font-bold">العقار غير موجود</div>;

  return (
    <AdminShell activeNav="properties" searchPlaceholder="البحث عن العقارات">
      <div className="bg-[#F8FAFC] min-h-screen p-4 md:p-8 font-sans relative text-right" dir="rtl">
        
        {/* نافذة الرفض */}
        {showRejectModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-2xl text-center">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-xl font-black mb-2">تأكيد الرفض</h3>
              <p className="text-slate-500 text-sm mb-6">سيتم إخفاء العقار من الموقع العام فوراً.</p>
              <div className="flex gap-3">
                <button disabled={updating} onClick={() => handleUpdateStatus("REJECTED")} className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold disabled:opacity-50">نعم، رفض</button>
                <button onClick={() => setShowRejectModal(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold">تراجع</button>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto">
          {/* Header المطور مع الـ Badge */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs text-slate-400">عقار #{property.id}</span>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                  property.status === "APPROVED" ? "bg-green-100 text-green-600" : 
                  property.status === "REJECTED" ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-600"
                }`}>
                  {property.status === "APPROVED" ? "منشور" : property.status === "REJECTED" ? "مرفوض" : "قيد المراجعة"}
                </span>
              </div>
              <h1 className="text-3xl font-black text-slate-900 leading-tight">{property.title}</h1>
            </div>

            {/* أزرار الإجراءات مع خاصية التعطيل */}
            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              <button onClick={() => window.open(`/property/${property.id}`, '_blank')} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-slate-200 transition-all">
                <Eye size={14}/> معاينة كزائر
              </button>
              <button 
                onClick={() => setShowRejectModal(true)} 
                disabled={updating || property.status === "REJECTED"}
                className="px-6 py-2.5 bg-white text-red-600 rounded-xl text-xs font-bold border border-red-100 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {property.status === "REJECTED" ? "تم الرفض" : "رفض الإعلان"}
              </button>
              <button 
                onClick={() => handleUpdateStatus("APPROVED")} 
                disabled={updating || property.status === "APPROVED"}
                className="px-8 py-2.5 bg-[#0095FF] text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-200 disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed transition-all flex items-center gap-2"
              >
                {updating ? <Loader2 className="animate-spin" size={14}/> : property.status === "APPROVED" ? <><CheckCircle size={14}/> تم النشر</> : "الموافقة والنشر"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              
              {/* معرض الصور مع معالجة حالة عدم وجود صور */}
              <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-200/50">
                <h3 className="text-sm font-black mb-6 flex items-center gap-2 text-slate-800 tracking-tight">📸 معرض الصور ({property.images?.length || 0})</h3>
                {property.images && property.images.length > 0 ? (
                  <div className="grid grid-cols-4 gap-4 h-[400px]">
                    <div className="col-span-4 md:col-span-3 relative rounded-[2rem] overflow-hidden border border-slate-100 shadow-inner">
                      <Image src={property.images[0].url} alt="Main" fill className="object-cover" />
                    </div>
                    <div className="hidden md:flex flex-col gap-4">
                      {property.images.slice(1, 3).map((img: any, i: number) => (
                        <div key={i} className="relative h-1/2 rounded-[1.5rem] overflow-hidden border border-slate-100">
                          <Image src={img.url} alt="sub" fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="h-[300px] bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
                    <Building size={48} className="opacity-10 mb-4" />
                    <p className="text-xs font-black">لا توجد صور مرفوعة لهذا العقار</p>
                  </div>
                )}
              </div>

              {/* المواصفات الفنية لملء الفراغ */}
              <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-200/50">
                <h3 className="text-sm font-black mb-10 flex items-center gap-2 text-slate-800">🏗 المواصفات الفنية</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  {[
                    { label: 'المساحة', val: property.area ? `${property.area} م² `: '---', icon: <Ruler size={24} className="text-blue-500"/> },
                    { label: 'حمامات', val: property.bathrooms ?` ${property.bathrooms} حمام` : '---', icon: <Bath size={24} className="text-indigo-500"/> },
                    { label: 'الطابق', val: property.floor || '---', icon: <Building size={24} className="text-emerald-500"/> },
                    { label: 'غرف النوم', val: property.bedrooms ?` ${property.bedrooms} غرف `: '---', icon: <BedDouble size={24} className="text-cyan-500"/> },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center p-6 bg-slate-50/50 rounded-[2rem] border border-slate-100">
                       <div className="mb-3 bg-white p-3 rounded-2xl shadow-sm">{item.icon}</div>
                       <span className="text-[10px] text-slate-400 font-bold uppercase">{item.label}</span>
                       <span className="text-sm font-black text-slate-800 mt-1">{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* الجانب الأيسر - Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#051327] rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="flex items-center gap-2 text-blue-400 mb-4 text-xs font-bold">
                  <Clock size={16}/> 
                  <span>{property.updatedAt ?` آخر تحديث: ${formatDistanceToNow(new Date(property.updatedAt), {addSuffix: true, locale: ar})}` : 'قيد المراجعة'}</span>
                </div>
                <p className="text-slate-400 text-xs mb-1">السعر المطلوب</p>
                <h2 className="text-4xl font-black tracking-tight">{property.price?.toLocaleString()} <span className="text-sm font-normal opacity-50 uppercase mr-1">ل.س</span></h2>
              </div>

              <div className="bg-white rounded-[2.5rem] border border-slate-200/50 p-8 shadow-sm">
                <h3 className="text-xs font-black mb-6 uppercase tracking-widest text-slate-400">📍 الموقع</h3>
                <div className="space-y-3 font-bold text-sm">
                  <div className="flex justify-between p-3 bg-slate-50 rounded-xl"><span>المدينة:</span><span className="text-blue-600">{property.city}</span></div>
                  <div className="flex justify-between p-3 bg-slate-50 rounded-xl"><span>المنطقة:</span><span className="text-blue-600">{property.region}</span></div>
                </div>
              </div>

              <div className="bg-white rounded-[2.5rem] border border-slate-200/50 p-8 shadow-sm text-center">
                 <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center font-black text-2xl border-4 border-white shadow-md">
                    {property.owner?.name?.charAt(0) || "U"}
                 </div>
                 <h3 className="font-black text-lg text-slate-900 mb-1">{property.owner?.name}</h3>
                 <p className="text-[10px] text-slate-400 font-bold mb-6 italic uppercase tracking-wider flex items-center justify-center gap-2">
                    <Tag size={12}/> مستخدم مسجل
                 </p>
                 <div className="py-4 bg-slate-900 text-white rounded-2xl text-sm font-mono font-bold shadow-lg flex items-center justify-center gap-2">
                    <Phone size={16} className="text-blue-400" /> {property.owner?.phone}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}