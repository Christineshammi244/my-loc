export const dynamic ="force-dynamic";
import { PhoneShell } from "@/components/mobile/phone-shell";
import { getNotifications, markAsRead } from "@/app/actions/notificationActions";
import { CheckCircle2, MessageSquare, Info } from "lucide-react"; 

export default async function NotificationsPage() {
  const notifications = await getNotifications();

  return (
    <PhoneShell title="الإشعارات">
      <div className="rounded-2xl bg-white p-3" dir="rtl">
        {/* أزرار الفلترة العلوية */}
        <div className="mb-3 flex justify-between text-sm font-bold border-b pb-2">
          <span className="text-[#2e84d6] cursor-pointer border-b-2 border-[#2e84d6] pb-1">الكل</span>
          <span className="text-slate-500 cursor-pointer">عقاراتي</span>
          <span className="text-slate-500 cursor-pointer">الطلبات</span>
        </div>
        
        <p className="mb-2 text-sm font-bold text-slate-500 text-right">اليوم</p>

        {/* عرض الإشعارات ديناميكياً */}
        <div className="flex flex-col gap-3">
          {notifications?.map((notification) => (
            <div
              key={notification.id}
              className={`rounded-2xl border-r-4 p-4 shadow-sm border bg-white text-right transition ${
                notification.title.includes("قبول") || notification.title.includes("نجاح")
                  ? "border-r-emerald-500" 
                  : notification.title.includes("تعليق") 
                  ? "border-r-[#2e84d6]" 
                  : "border-r-amber-500"
              } ${!notification.isRead ? "bg-blue-50/20" : ""}`}
            >
              <div className="flex items-start gap-3">
                {/* الأيقونة الجانبية حسب نوع الإشعار */}
                <div className="mt-1">
                  {notification.title.includes("قبول") || notification.title.includes("نجاح") ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  ) : notification.title.includes("تعليق") ? (
                    <MessageSquare className="h-5 w-5 text-[#2e84d6]" />
                  ) : (
                    <Info className="h-5 w-5 text-amber-500" />
                  )}
                </div>

                {/* تفاصيل الإشعار */}
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className={`text-sm font-bold ${!notification.isRead ? "text-slate-900" : "text-slate-700"}`}>
                      {notification.title}
                    </h3>
                    <span className="text-[10px] text-slate-400">
                      {new Date(notification.createdAt).toLocaleDateString("ar-SY")}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{notification.message}</p>
                </div>
              </div>

              {/* زر تحديد كمقروء للمستخدم */}
              {!notification.isRead && (
                <form
                  action={async () => {
                    "use server";
                    await markAsRead(notification.id);
                  }}
                  className="mt-2 flex justify-end border-t pt-2 border-dashed border-slate-100"
                >
                  <button type="submit" className="text-[11px] font-bold text-[#2e84d6] hover:underline">
                    تحديد كمقروء ✓
                  </button>
                </form>
              )}
            </div>
          ))}
        </div>

        {/* في حال عدم وجود إشعارات */}
        {notifications?.length === 0 && (
          <p className="text-center text-slate-400 py-12 text-sm">لا توجد إشعارات جديدة حالياً.</p>
        )}
        
      </div>
    </PhoneShell>
  );
}