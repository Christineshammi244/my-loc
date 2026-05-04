"use server";

import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

// 1. إضافة أو حذف من المفضلة (Toggle)
export async function toggleWishlistAction(propertyId) {
  const { userId } = auth(); // التأكد من هوية المستخدم عبر Clerk 
    if (!userId) {
    return { success: false, error: "يجب تسجيل الدخول للإعجاب بالعقار" };
    }

    try {
    // البحث إذا كان العقار موجوداً أصلاً في مفضلة المستخدم
    const existing = await prisma.wishlist.findFirst({
        where: { 
        userId: userId, 
        propertyId: Number(propertyId) 
        }
    });

    if (existing) {
      // إذا كان موجوداً -> نقوم بحذفه (Unlike)
        await prisma.wishlist.delete({
        where: { id: existing.id }
});
      revalidatePath("/"); // لتحديث واجهة المستخدم فوراً
        return { success: true, status: "removed" };
    } else {
      // إذا لم يكن موجوداً -> نقوم بإضافته (Like)
        await prisma.wishlist.create({
        data: {
            userId: userId,
            propertyId: Number(propertyId)
        }
        });
    revalidatePath("/");
    return { success: true, status: "added" };
    }
    } catch (error) {
    console.error("Wishlist Error:", error);
    return { success: false, error: "حدث خطأ في قاعدة البيانات" };
    }
}

// 2. جلب قائمة العقارات المفضلة لعرضها في صفحة المستخدم
export async function getWishlistAction() {
const { userId } = auth();
if (!userId) return [];

try {
    const favorites = await prisma.wishlist.findMany({
    where: { userId: userId },
    include: {
        property: true, // جلب تفاصيل العقار كاملة (العنوان، السعر، الصورة)
    },
    });

    // استخراج بيانات العقارات فقط من نتيجة الربط
    return favorites.map((fav) => fav.property);
} catch (error) {
    console.error("Get Wishlist Error:", error);
    return [];
}
}

// 3. فحص حالة القلب (هل العقار مفضل حالياً؟)
export async function isLikedAction(propertyId) {
const { userId } = auth();
if (!userId) return false;

const existing = await prisma.wishlist.findFirst({
    where: {
userId: userId,
propertyId: Number(propertyId)
    }
});

  return !!existing; // تعيد true إذا وجد، و false إذا لم يوجد
}