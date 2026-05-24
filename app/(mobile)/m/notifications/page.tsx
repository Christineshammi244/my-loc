import { PhoneShell } from "@/components/mobile/phone-shell";
import { getNotifications, markAsRead } from "@/app/actions/notificationActions";

export default async function NotificationsPage() {
  const notifications = await getNotifications();

  return (
    <PhoneShell title="الإشعارات">
      <div className="rounded-2xl bg-white p-4">
        
        {notifications?.map((notification) => (
          <div
            key={notification.id}
            className={`mb-3 flex flex-col rounded-xl border p-3 transition ${
              notification.isRead ? "border-slate-100 bg-slate-50" : "border-blue-100 bg-blue-50/40"
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">
                {new Date(notification.createdAt).toLocaleDateString("ar-SY")}
              </span>
              <h4 className={`text-sm font-bold ${notification.isRead ? "text-slate-700" : "text-slate-900"}`}>
                {notification.title}
              </h4>
            </div>
            <p className="mt-2 text-right text-xs text-slate-600">
              {notification.message}
            </p>

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

        {notifications?.length === 0 && (
          <p className="text-center text-slate-400 py-8 text-sm">لا توجد إشعارات جديدة حالياً.</p>
        )}
        
      </div>
    </PhoneShell>
  );
}