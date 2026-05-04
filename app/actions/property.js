"use server";

import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// دالة جلب العقارات التي أضافها المستخدم الحالي فقط
export async function getMyPropertiesAction() {
  // 1. جلب معرف المستخدم من Clerk
    const { userId } = auth();

  // 2. إذا لم يكن مسجلاً، نرجع قائمة فارغة
    if (!userId) {
    return [];
    }

    try {
    // 3. البحث في جدول العقارات عن التي يملكها هذا الـ ID
    const myProperties = await prisma.property.findMany({
        where: {
        ownerId: userId, // الربط الذي قمنا به في مهمة المزامنة
        },
        orderBy: {
        createdAt: "desc", // ترتيب من الأحدث للأقدم
        },
    });

    return myProperties;
    } catch (error) {
    console.error("خطأ في جلب عقاراتي:", error);
    return [];
    }
}