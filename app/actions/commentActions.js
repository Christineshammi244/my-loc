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
    const { userId } = await auth();
    if (!userId) return { error: "يجب تسجيل الدخول أولاً" };

    const dbUser = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!dbUser) return { error: "المستخدم غير مزامن" };

    const newComment = await prisma.comment.create({
        data: {
        content: text,
        userId: dbUser.id, 
        username: dbUser.name || "مستخدم مجهول", 
        propertyId: parseInt(propertyId), 
        },
    });
    revalidatePath(`/m/property-details/${propertyId}`); 
    revalidatePath(`/m/properties/${propertyId}`);
    return { success: true, comment: newComment };
    } catch (error) {
    console.error("COMMENT_ERROR:", error);
    return { error: "حدث خطأ أثناء إضافة التعليق" };
    }
}




export async function getMyComments() {
    try {
    const { userId } = await auth();
    if (!userId) return [];

    const comments = await prisma.comment.findMany({
        where: { userId: userId },
        orderBy: { createdAt: "desc" },
    });
    return comments;
    } catch (error) {
    console.error("GET_MY_COMMENTS_ERROR:", error);
    return [];
    }
}

// دالة حذف تعليق خاص بالمستخدم
export async function deleteMyComment(commentId) {
    try {
    const { userId } = await auth();
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