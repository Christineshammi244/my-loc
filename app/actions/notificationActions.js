"use server";

import  prisma  from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
/**
 * @returns {Promise<import('@prisma/client').Notification[]>}
 */
// 1. جلب كافة إشعارات المستخدم الحالي
export async function getNotifications() {
    try {
    const { userId } = await auth();
    if (!userId) return [];

    // جلب المستخدم الداخلي أولاً لأن السكيما تعتمد على معرف الـ id الداخلي
    const dbUser = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!dbUser) return [];

    const notifications = await prisma.notification.findMany({
        where: {
        userId: dbUser.id, // الربط عبر معرف المستخدم الداخلي من السكيما
        },
        orderBy: {
        createdAt: "desc", // الأحدث أولاً
        },
    });

    return notifications;
    } catch (error) {
    console.error("GET_NOTIFICATIONS_ERROR:", error);
    if (!dbUser) return [];
    }
}

// 2. تحديث حالة الإشعار إلى "مقروء"
export async function markAsRead(notificationId) {
    try {
    const { userId } = await auth();
    if (!userId) return { success: false };

    await prisma.notification.update({
        where: {
        id: notificationId, // إذا كان المعرف Int بالسكيما يرجى كتابتها: parseInt(notificationId)
        },
        data: {
        isRead: true,
        },
    });

    revalidatePath("/notifications");
    return { success: true };
    } catch (error) {
    console.error("MARK_AS_READ_ERROR:", error);
    return { success: false };
    }
}