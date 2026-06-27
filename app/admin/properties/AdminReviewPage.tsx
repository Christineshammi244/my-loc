"use client";

import Image from "next/image";
import { Eye, Loader2, CheckCircle, Building, Ruler, Bath, BedDouble, Clock, Tag, Phone } from "lucide-react";
import { useState, startTransition } from "react";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";
import { updatePropertyStatus } from "@/app/actions/propertyActions";
// استدعاء الهيكل المحيط بلوحة الأدمن ليعود الهيدر والسايدبار
import {AdminShell} from "@/components/admin/admin-shell"; 

interface PropertyImage {
  id: string;
  url: string;
}

interface Owner {
  name: string;
  phone: string;
}

interface PropertyType {
  id: string;
  title: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  images: PropertyImage[];
  area?: number;
  bathrooms?: number;
  floor?: string;
  bedrooms?: number;
  updatedAt?: string;
  price: number;
  city: string;
  region?: string;
  owner?: Owner;
  description?: string;
}

interface PageProps {
  pendingProperties: PropertyType[];
}

export default function AdminReviewPage({ pendingProperties = [] }: PageProps) {
  const [propertiesList, setPropertiesList] = useState<PropertyType[]>(pendingProperties);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function handleStatusUpdate(propertyId: string, newStatus: "APPROVED" | "REJECTED") {
    if (updatingId) return;
    setUpdatingId(propertyId);

    startTransition(async () => {
      try {
        await updatePropertyStatus(propertyId, newStatus);
        setPropertiesList(prev => prev.filter(p => p.id !== propertyId));
        alert(newStatus === "APPROVED" ? "تمت الموافقة على الإعلان ونشره بنجاح!" : "تم رفض الإعلان بنجاح.");
      } catch (error) {
        console.error("Error updating status:", error);
        alert("حدث خطأ ما، يرجى المحاولة مرة أخرى.");
      } finally {
        setUpdatingId(null);
      }
    });
  }

  if (propertiesList.length === 0) {
    return (
      <AdminShell  activeNav="properties" 
        searchPlaceholder="بحث عن عقار معلق..." 
        sidebarVariant="default"
        searchValue=""
        onSearchChange={() => {}}
        onSearchClick={() => {}}>
        <div className="max-w-7xl mx-auto p-12 text-center" dir="rtl">
          <div className="bg-white rounded-[2.5rem] p-12 border border-slate-200/50 shadow-sm flex flex-col items-center justify-center text-slate-400">
            <Building size={64} className="opacity-20 mb-4 text-[#0095FF]" />
            <h2 className="text-xl font-black text-slate-800 mb-2">لوحة مراجعة العقارات صافية!</h2>
            <p className="text-xs font-bold text-slate-400">لا توجد طلبات عقارات معلقة بانتظار المراجعة حالياً.</p>
          </div>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell  activeNav="properties" 
        searchPlaceholder="بحث عن عقار معلق..." 
        sidebarVariant="default"
        searchValue=""
        onSearchChange={() => {}}
        onSearchClick={() => {}}>
      <div className="space-y-16 max-w-7xl mx-auto p-4 md:p-8" dir="rtl">
        <h1 className="text-2xl font-black text-slate-900 border-b pb-4 mb-6">
          طلبات المراجعة المعلقة بقسم المعاملات ({propertiesList.length})
        </h1>

        {propertiesList.map((property) => (
          <div key={property.id} className="border-b-4 border-dashed border-slate-200 pb-12 last:border-none last:pb-0">
            
            {/* ================= Header المطور مع الـ Badge الخاصة بكِ ================= */}
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
                <h1 className="text-2xl font-black text-slate-900 leading-tight">{property.title}</h1>
              </div>

              <div className="flex flex-wrap gap-3 w-full md:w-auto">
                <button 
                  onClick={() => window.open(`/property/${property.id}`, '_blank')} 
                  className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-slate-200 transition-all cursor-pointer"
                >
                  <Eye size={14}/> معاينة كزائر
                </button>
                <button 
                  onClick={() => handleStatusUpdate(property.id, "REJECTED")} 
                  disabled={updatingId === property.id || property.status === "REJECTED"}
                  className="px-6 py-2.5 bg-white text-red-600 rounded-xl text-xs font-bold border border-red-100 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {property.status === "REJECTED" ? "تم الرفض" : "رفض الإعلان"}
                </button>
                <button 
                  onClick={() => handleStatusUpdate(property.id, "APPROVED")} 
                  disabled={updatingId === property.id || property.status === "APPROVED"}
                  className="px-8 py-2.5 bg-[#0095FF] text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-200 disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed transition-all flex items-center gap-2 cursor-pointer"
                >
                  {updatingId === property.id ? <Loader2 className="animate-spin" size={14}/> : property.status === "APPROVED" ? <><CheckCircle size={14}/> تم النشر</> : "الموافقة والنشر"}
                </button>
              </div>
            </div>{/* ================= شبكة عرض البيانات الفنية للموقع والمستخدم ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* الجزء الأيمن: معرض الصور والمواصفات */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* معرض الصور بتصميمكِ الفاخر المصمم للحواف rounded-[2.5rem] */}
                <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-200/50">
                  <h3 className="text-sm font-black mb-6 flex items-center gap-2 text-slate-800 tracking-tight">📸 معرض الصور ({property.images?.length || 0})</h3>
                  {property.images && property.images.length > 0 ? (
                    <div className="grid grid-cols-4 gap-4 h-[400px]">
                      <div className="col-span-4 md:col-span-3 relative rounded-[2rem] overflow-hidden border border-slate-100 shadow-inner">
                        <Image src={property.images[0].url} alt="Main" fill className="object-cover" />
                      </div>
                      <div className="hidden md:flex flex-col gap-4">
                        {property.images.slice(1, 3).map((img, i) => (
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

                {/* المواصفات الفنية بالتوزيع الرباعي المنسق حواف rounded-[2rem] */}
                <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-200/50">
                  <h3 className="text-sm font-black mb-10 flex items-center gap-2 text-slate-800">🏗 المواصفات الفنية</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {[
                      { label: 'المساحة', val: property.area ? `${property.area} م²ّ `: '---', icon: <Ruler size={24} className="text-blue-500"/> },
                      { label: 'حمامات', val: property.bathrooms ? `${property.bathrooms} حمام `: '---', icon: <Bath size={24} className="text-indigo-500"/> },
                      { label: 'الطابق', val: property.floor || '---', icon: <Building size={24} className="text-emerald-500"/> },
                      { label: 'غرف النوم', val: property.bedrooms ? `${property.bedrooms} غرف` : '---', icon: <BedDouble size={24} className="text-cyan-500"/> },
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center p-6 bg-slate-50/50 rounded-[2rem] border border-slate-100">
                         <div className="mb-3 bg-white p-3 rounded-2xl shadow-sm">{item.icon}</div>
                         <span className="text-[10px] text-slate-400 font-bold uppercase">{item.label}</span>
                         <span className="text-sm font-black text-slate-800 mt-1">{item.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* الوصف التفصيلي للعقار إذا كان موجوداً */}
                {property.description && (
                  <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-200/50">
                    <h3 className="text-sm font-black mb-4 text-slate-800">📝 الوصف التفصيلي</h3>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed bg-slate-50/50 p-4 rounded-2xl border">{property.description}</p>
                  </div>
                )}</div>

              {/* الجزء الأيسر: السعر والموقع والمستخدم */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* صندوق السعر الفاخر بلون خلفية كودك المعتمد [#051327] */}
                <div className="bg-[#051327] rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
                  <div className="flex items-center gap-2 text-blue-400 mb-4 text-xs font-bold">
                    <Clock size={16}/> 
                    <span>{property.updatedAt ?` آخر تحديث: ${formatDistanceToNow(new Date(property.updatedAt), {addSuffix: true, locale: ar})} `: 'قيد المراجعة'}</span>
                  </div>
                  <p className="text-slate-400 text-xs mb-1">السعر المطلوب</p>
                  <h2 className="text-4xl font-black tracking-tight">{property.price?.toLocaleString()} <span className="text-sm font-normal opacity-50 uppercase mr-1">ل.س</span></h2>
                </div>

                {/* الموقع الجغرافي */}
                <div className="bg-white rounded-[2.5rem] border border-slate-200/50 p-8 shadow-sm">
                  <h3 className="text-xs font-black mb-6 uppercase tracking-widest text-slate-400">📍 الموقع</h3>
                  <div className="space-y-3 font-bold text-sm">
                    <div className="flex justify-between p-3 bg-slate-50 rounded-xl"><span>المدينة:</span><span className="text-blue-600">{property.city}</span></div>
                    <div className="flex justify-between p-3 bg-slate-50 rounded-xl"><span>المنطقة:</span><span className="text-blue-600">{property.region || 'غير محدد'}</span></div>
                  </div>
                </div>

                {/* بطاقة مالك العقار ومعلومات التواصل المستخرجة */}
                <div className="bg-white rounded-[2.5rem] border border-slate-200/50 p-8 shadow-sm text-center">
                   <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center font-black text-2xl border-4 border-white shadow-md">
                      {property.owner?.name?.charAt(0) || "U"}
                   </div>
                   <h3 className="font-black text-lg text-slate-900 mb-1">{property.owner?.name || "مستخدم غير معروف"}</h3>
                   <p className="text-[10px] text-slate-400 font-bold mb-6 italic uppercase tracking-wider flex items-center justify-center gap-2">
                      <Tag size={12}/> مستخدم مسجل
                   </p>
                   <div className="py-4 bg-slate-900 text-white rounded-2xl text-sm font-mono font-bold shadow-lg flex items-center justify-center gap-2">
                      <Phone size={16} className="text-blue-400" /> {property.owner?.phone || "لا يوجد رقم متصل"}
                   </div>
                </div>

              </div>
            </div>

          </div>
        ))}
      </div>
    </AdminShell>
  );
}