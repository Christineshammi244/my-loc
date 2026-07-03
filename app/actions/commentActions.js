"use server";

import  prisma  from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// 1. جلب تعليقات عقار محدد بناءً على الـ Int
export async function getComments(propertyId) {
    if (!propertyId || isNaN(parseInt(propertyId))) {
    return [];
    }
    try {
    const comments = await prisma.comment.findMany({
        where: {
        propertyId: parseInt(propertyId), 
        },
        orderBy: {
        createdAt: "desc", 
        },
    });
    return comments;
    } catch (error) {
    console.error("GET_COMMENTS_ERROR:", error);
    return [];
    }
}

// 2. إضافة تعليق جديد لعقار محدد
export async function addComment(propertyId, text) {
    try {
    // const { userId } = await auth(); 
    const userId = "user_test123456";
    if (!userId) return { error: "يجب تسجيل الدخول أولاً" };

    const dbUser = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!dbUser) return { error: "المستخدم غير متزامن" };

    // 1. إنشاء التعليق وتخزينه في متحول
    const newComment = await prisma.comment.create({
        data: {
        content: text,
        userId: userId,
        propertyId: parseInt(propertyId),
        },
    });

    // تحديث مسارات الكاش في الفرونت إند
    revalidatePath(`/m/property-details/${propertyId}`);
    revalidatePath('/m/comments');
    revalidatePath('/m/my-comments');
    revalidatePath('/m/notifications');

    // 2. فكرتكِ الذكية: إنشاء الإشعار وتخزينه في متحول مستقل
    const newNotification = await prisma.notification.create({
        data: {
        userId: userId, 
        title: "تعليق جديد 💬",
        message: "تمت إضافة تعليق جديد على العقار: " + text.substring(0, 30) + "..."
        }
    });
    
    // إرجاع النتيجة بنجاح مع السجلات التي تم إنشاؤها
    return { 
        success: true, 
        comment: newComment,
        notification: newNotification 
    };

    } catch (error) {
    console.error("COMMENT_ERROR:", error);
    return {
        success: false,
        error: error.message || "حدث خطأ أثناء إضافة التعليق"
    };
    }
}

export async function getMyComments() {
    try {
   // const { userId } = await auth();
    const  userId  ="user_test123456";
    if (!userId) return [];

    const comments = await prisma.comment.findMany({
        where: { userId: userId,
            },
        orderBy: { createdAt: "desc" },
    });
    return comments ;
    } catch (error) {
    console.error("GET_MY_COMMENTS_ERROR:", error);
    return [];
    }
}

// دالة حذف تعليق خاص بالمستخدم
export async function deleteMyComment(commentId) {
    try {
   // const { userId } = await auth();
    const  userId  ="user_test123456";
    if (!userId) return { error: "يجب تسجيل الدخول أولاً" };

    await prisma.comment.delete({
        where: { 
        id: parseInt(commentId),
        userId: userId // أمان إضافي لحذف تعليقك أنتِ فقط
        },
    });
    revalidatePath("/m/my-comments");
    return { success: true };
    } catch (error) {
    console.error("DELETE_COMMENT_ERROR:", error);
    return { error: "فشل في الحذف" };
    }
    

}