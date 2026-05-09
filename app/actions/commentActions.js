"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function addComment(propertyId, text) {
    try {
    // 1. جلب الـ userId من Clerk
    const { userId } = await auth();

    if (!userId) {
        return { error: "يجب تسجيل الدخول أولاً" };
    }

    // 2. إنشاء التعليق في الداتابيز
    const newComment = await prisma.comment.create({
        data: {
        content: text, // تأكدي لو مسميتيه content أو text في السكيما
        userId: userId,
        propertyId: parseInt(propertyId), // تحويل الـ ID لـ Int إذا كان هاد نوعه عندك
        },
    });


    // 3. تحديث الصفحة فوراً
    revalidatePath(`/properties/${propertyId}`);

    return { success: true, comment: newComment };
    } catch (error) {
    console.error("COMMENT_ERROR:", error);
    return { error: "حدث خطأ أثناء إضافة التعليق" };
    }
}
export async function getComments(propertyId) {
    try {
    const comments = await prisma.comment.findMany({
        where: { 
        propertyId: parseInt(propertyId) 
        },
        orderBy: { 
        createdAt: "desc" 
        },
    });
    return comments;
    } catch (error) {
    console.error("GET_COMMENTS_ERROR:", error);
    return [];
    }
}
export async function deleteComment(commentId) {
    try {
    // 1. التأكد من هوية المستخدم عبر Clerk
    const { userId } = await auth();

    if (!userId) {
        return { error: "يجب تسجيل الدخول أولاً" };
    }

    // 2. جلب التعليق للتأكد من المالك
    const comment = await prisma.comment.findUnique({
        where: { id: commentId },
    });

    if (!comment) {
        return { error: "التعليق غير موجود" };
    }

    // 3. 🔒 حماية: هل هذا المستخدم هو صاحب التعليق؟
    if (comment.userId !== userId) {
        return { error: "غير مسموح لك بحذف هذا التعليق" };
    }

    // 4. تنفيذ الحذف
    await prisma.comment.delete({
        where: { id: commentId },
    });

    // 5. تحديث الصفحة (Refresh)
    revalidatePath(`/properties/${comment.propertyId}`);

    return { success: true, message: "تم حذف التعليق بنجاح" };
    } catch (error) {
    console.error("DELETE_COMMENT_ERROR:", error);
    return { error: "فشل في حذف التعليق" };
    }
}