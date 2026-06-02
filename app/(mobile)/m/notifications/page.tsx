import { PhoneShell } from "@/components/mobile/phone-shell";
import { getNotifications, markAsRead } from "@/app/actions/notificationActions";
// استيراد الأيقونات المستخدمة لمنع ظهور أخطاء جديدة
import { CheckCircle2, XCircle } from "lucide-react"; 

export default async function NotificationsPage() {
  const notifications = await getNotifications();

  return (
    <PhoneShell title="الإشعارات">
      <div className="rounded-2xl bg-white p-3">
        {/* أزرار الفلترة العلوية */}
        <div className="mb-3 flex justify-between text-sm font-bold">
          <span className="text-[#2e84d6] cursor-pointer">الكل</span>
          <span className="text-slate-500 cursor-pointer">عقاراتي</span>
          <span className="text-slate-500 cursor-pointer">الطلبات</span>
        </div>
        
        <p className="mb-2 text-sm font-bold text-slate-500">اليوم</p>

        {/* عرض الإشعارات القادمة من قاعدة البيانات ديناميكياً */}
        {notifications?.map((notification) => (
          <div
            key={notification.id}
            className={`mb-3 flex flex-col rounded-xl border p-3 transition ${
              notification.isRead ? "border-slate-100 bg-slate-50" : "border-blue-100 bg-blue-50/40"
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-slate-400">
                {new Date(notification.createdAt).toLocaleDateString("ar-SY")}
              </span>
              <h4 className={`text-sm font-bold ${notification.isRead ? "text-slate-700" : "text-slate-900"}`}>
                {notification.title}
              </h4>
            </div>

            <p className="text-sm text-slate-600 text-right mb-2">
              {notification.message}
            </p>

            {/* عرض شكل مخصص حسب حالة الإشعار (مثال توضيحي بناءً على تصميمك) */}
            <article className={`mb-2 rounded-2xl border-r-4 p-3 shadow-sm bg-white ${notification.title.includes("قبول") ? "border-emerald-500" : "border-red-400"}`}>
              <div className="flex items-start gap-2">
                {notification.title.includes("قبول") ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                <div>
                  <h3 className="text-base font-bold">{notification.title}</h3>
                  <p className="text-xs text-slate-500">تفاصيل الإشعار المرفق</p>
                </div>
              </div>
            </article>

            {/* زر تحديد كمقروء إذا لم يكن مقروءاً */}
            {!notification.isRead && (
              <form
                action={async () => {
                  "use server";
                  await markAsRead(notification.id);
                }}
                className="mt-2 flex justify-end"
              >
                <button type="submit" className="text-xs font-semibold text-[#2e84d6] hover:underline">
                  تحديد كمقروء
                </button>
              </form>
            )}
          </div>
        ))}

        {/* في حال عدم وجود إشعارات */}
        {notifications?.length === 0 && (
          <p className="text-center text-slate-400 py-8 text-sm">لا توجد إشعارات جديدة حالياً.</p>
        )}
        
      </div>
    </PhoneShell>
  );
}