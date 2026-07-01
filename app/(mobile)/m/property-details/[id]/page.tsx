"use client";

import Image from "next/image";
import { PhoneShell } from "@/components/mobile/phone-shell";
import React, { useState, useEffect } from "react";
import {
  Heart,
  MapPin,
  Square,
  BedDouble,
  ShieldCheck,
  MessageSquare,
  Send,
} from "lucide-react";

// استيراد الأكشنز الخاصة بك من الباك إيند
import { getPropertyById } from "@/app/actions/propertyActions"; 
import { isLikedAction, toggleWishlistAction } from "@/app/actions/wishList";
// ملاحظة: إذا كان أكشن التعليقات في ملف آخر قم بتغيير المسار بالأسفل
import { addComment } from "@/app/actions/commentActions"; 
import { currentUser } from "@clerk/nextjs/server";

// 1. تعريف مخطط البيانات (Interface) لمنع أخطاء TypeScript الصارمة
interface CommentType {
  id: number | string;
  userName: string;
  content: string;
  isOwner: boolean;
  createdAt?: string;
}

interface PropertyData {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  type: string;
  category: string;
  status: string;
  createdAt: string;
  ownerId: string;
  area?: number;
  rooms: number;
  bathrooms: number;
  floor?: string;
  city?: string;
  region?: string;
  images?: Array<{ id: number; url: string; propertyId: number }>; // هذا السطر الذي يحل مشكلة الـ url
  comments?: Array<{
    id: number | string;
    userName: string;
    content: string;
    isOwner: boolean;
    createdAt?: string;
  }>;
  owner?: {
    name?: string;
    avatar?: string;
    phone?: string;
  };
}

interface PropertyProps {
  params: Promise< { id: string }>;
}

export default function PropertyDetailsPage({ params }: PropertyProps) {
  const { id } = React.use(params) as { id: string };
  const [property, setProperty] = useState<PropertyData | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sendingComment, setSendingComment] = useState(false);

 // 2. جلب بيانات العقار من قاعدة البيانات عند تحميل الصفحة
  useEffect(() => {
    async function fetchPropertyData() {
      try {
        const response = await getPropertyById(id);
        
        if (response) {
          // الباك إيند يرجع العقار مباشرة
          const fetchedData = response as unknown as PropertyData;
          setProperty(fetchedData);
          setComments(fetchedData.comments || []);
        }

        // جلب حالة الإعجاب بالعقار (المفضلة)
        if (typeof isLikedAction === 'function') {
          const favoriteStatus = await isLikedAction(id);
          setLiked(!!favoriteStatus);
        }
      } catch (error) {
        console.error("خطأ في جلب بيانات العقار:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPropertyData();
  }, [id]);
 // 3. دالة التفاعل مع زر المفضلة
  const handleLikeToggle = async () => {
    const numericId = Number(id);
    if (isNaN(numericId)) return;

    // قلب الحالة فوراً وتثبيتها
    setLiked(!liked); 

    try {
      // إرسال الطلب للسيرفر فقط ليقوم بالتحديث في قاعدة البيانات
      await toggleWishlistAction(numericId);
    } catch (error) {
      console.error("خطأ في الاتصال بالسيرفر أثناء تعديل المفضلة:", error);
    }
  };
 // 4. دالة إرسال تعليق جديد وحفظه في قاعدة البيانات
  const handleSendComment = async () => {
  if (!commentText.trim() || sendingComment) return;

  setSendingComment(true);
  try {
    const response = await addComment(id, commentText);

    // التحقق الصريح من نجاح العملية من السيرفر أكشن
    if (response && response.success && response.comment) {
      const newComment = response.comment as unknown as CommentType;
      setComments((prev) => [...prev, newComment]);
      setCommentText("");
    } else {
      // طباعة الخطأ القادم من السيرفر في الـ Console لمعرفته
      console.error("Server Error:", response?.error);
      alert(response?.error || "فشل إرسال التعليق، يرجى المحاولة لاحقاً");
    }
  } catch (error) {
    console.error("Client Error:", error);
    alert("حدث خطأ أثناء الإرسال");
  } finally {
    // هذا السطر يضمن إيقاف الويندر (التحميل) سواء نجحت العملية أو فشلت
    setSendingComment(false);
  }
};

  if (loading) {
    return (
      <PhoneShell title="تفاصيل العقار">
        <div className="flex h-96 items-center justify-center text-sm font-sans" dir="rtl">
          جاري تحميل تفاصيل العقار...
        </div>
      </PhoneShell>
    );
  }

  if (!property) {
    return (
      <PhoneShell title="تفاصيل العقار">
  <div className="flex h-96 items-center justify-center text-sm font-sans text-red-500" dir="rtl">
          العقار غير موجود أو تم حذفه.
        </div>
      </PhoneShell>
    );
  }
const mainImage = property.images && property.images.length > 0 
  ? (typeof property.images[0]==='object' ? property.images [0].url : property.images[0]) :"/photo_2026-05-23_20-40-28.jpg";
  return (
    <PhoneShell title="تفاصيل العقار">
      <div className="space-y-4 font-sans pb-6" dir="rtl">
        {/* 1. قسم الصورة العلوية مع زر المفضلة */}
        <section className="relative rounded-2xl bg-white p-2 shadow-sm">
          <div className="relative h-56 overflow-hidden rounded-xl">
            <img 
              src={ mainImage } 
              alt={property?.title || "صورة العقار"} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute top-3 right-3 rounded-md bg-black/60 px-2 py-0.5 text-xs text-white">
              1/1
            </div>
          </div>

          {/* تفاصيل العنوان والسعر القادمة من قاعدة البيانات */}
          <div className="px-1 py-3">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-xl font-extrabold text-slate-900 leading-snug">
                {property.title}
              </h3>
              <button
                onClick={handleLikeToggle}
                className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition"
              >
                <Heart
                  size={20}
                  fill={liked ? "#ef4444" : "none"}
                  className={liked ? "text-red-500" : "text-slate-400"}
                />
              </button>
            </div>

            <div className="mt-1 flex items-center gap-1 text-xs text-cyan-600 font-medium">
              <MapPin size={14} />
              <span>{property.location}</span>
            </div>

            <p className="mt-2 text-2xl font-black text-amber-500">
              {Number(property.price).toLocaleString()} $
            </p>
          </div>

          {/* 2. مربعات المواصفات الثلاثية */}
          <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 pb-1 text-center">
            <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-2">
              <Square size={18} className="mx-auto text-cyan-600 mb-1" />
              <p className="text-[11px] text-slate-400">المساحة</p>
              <p className="text-xs font-bold text-slate-800">{property.area} م²</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-2">
              <BedDouble size={18} className="mx-auto text-cyan-600 mb-1" />
              <p className="text-[11px] text-slate-400">الغرف</p>
              <p className="text-xs font-bold text-slate-800">{property.rooms} غرف</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-2">
              <MapPin size={18} className="mx-auto text-cyan-600 mb-1" />
              <p className="text-[11px] text-slate-400">الموقع</p>
              <p className="text-xs font-bold text-slate-800">{property.city} </p>
            </div>
          </div>
        </section>

        {/* 3. بطاقة المكتب العقاري المسؤول */}
        <section className="flex items-center justify-between rounded-xl border border-cyan-100 bg-cyan-50/30 p-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border flex place-items-center justify-center border-slate-200">
           {property.owner?.avatar ? (
  <img
    src={property.owner.avatar}
    alt="avatar"
    className="w-full h-full object-cover"
  />
) : (
  <svg 
    className="w-6 h-6 text-slate-400 mt-1" 
    fill="currentColor" 
    viewBox="0 0 24 24"
  >
    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
)}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">
                {property.owner?.name || "مكتب العقارات الذهبي"}
              </p>
              <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-600 font-medium">
                <ShieldCheck size={12} /> متصل الآن
              </span>
            </div>
          </div>
        <ShieldCheck size={20} className="text-cyan-500" />
        </section>

        {/* 4. تفاصيل الوصف الكامل */}
        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <h4 className="border-r-4 border-amber-500 pr-2 text-sm font-bold text-slate-900 mb-2">
            التفاصيل الكاملة
          </h4>
          <p className="text-xs leading-6 text-slate-600 font-medium">
            {property.description}
          </p>
        </section>

        {/* 5. أزرار التحكم الثابتة (طلب شراء / اتصال هاتفياً) */}
        <div className="grid grid-cols-2 gap-3">
          <button className="rounded-xl bg-amber-500 py-3 text-sm font-bold text-white shadow-md shadow-amber-500/20 active:scale-95 transition-transform">
            طلب شراء
          </button>
          <a 
            href={`tel:${property.owner?.phone || ""}`}
            className="rounded-xl bg-cyan-500 py-3 text-center text-sm font-bold text-white shadow-md shadow-cyan-500/20 active:scale-95 transition-transform"
          >
            اتصال
          </a>
        </div>

    {/* 6. قسم التعليقات والمناقشات المتصل بقاعدة البيانات */}
        <section className="rounded-2xl bg-white p-4 shadow-sm space-y-3">
          <h4 className="flex items-center gap-1.5 border-r-4 border-amber-500 pr-2 text-sm font-bold text-slate-900 mb-3">
            <MessageSquare size={16} className="text-amber-500" />
            <span>التعليقات والمناقشات</span>
          </h4>

          {/* قائمة عرض التعليقات الحقيقية */}
          <div className="max-h-60 overflow-y-auto space-y-3 pl-1">
            {comments.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-2">لا توجد تعليقات بعد. كن أول من يعلّق!</p>
            ) : (
              comments.map((comment,index) => (
                <div 
                  key={comment.id || index} 
                  className={`space-y-1 rounded-xl p-3 ${
                    comment.isOwner 
                      ? "mr-6 bg-amber-50/70 border border-amber-100" 
                      : "bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${comment.isOwner ? "text-amber-600" : "text-cyan-600"}`}>
                      {comment.userName} {comment.isOwner && "(صاحب العقار)"}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString('ar-SY') : "الآن"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* حقل إضافة تعليق جديد */}
          <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3">
            <div className="relative flex-1">
           <input
  type="text"
  placeholder={sendingComment ? "جاري الإرسال..." : "أضف تعليقاً..."}
  value={commentText}
  disabled={sendingComment}
  onChange={(e) => setCommentText(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendComment();
    }
  }}
  className="w-full rounded-full bg-slate-50 border border-slate-200 px-4 py-2.5 text-xs text-slate-800 outline-none focus:border-cyan-500 focus:bg-white transition-colors disabled:opacity-50"
/>
            </div>
            <button 
              onClick={handleSendComment}
              disabled={sendingComment || !commentText.trim()}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500 text-white shadow-sm hover:bg-cyan-600 transition-colors disabled:bg-slate-300"
            >
              <Send size={14} className="rotate-180" />
            </button>
          </div>
        </section>
      </div>
    </PhoneShell>
  );
}