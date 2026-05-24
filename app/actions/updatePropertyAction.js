"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function updateProperty(propertyId, data) {
    try {
        // 1. التحقق من هوية المستخدم عبر Clerk
        const { userId } = auth();
        if (!userId) {
            throw new Error("يجب تسجيل الدخول للقيام بهذه العملية");
        }

        // 2. التأكد من أن العقار موجود وأن المستخدم الحالي هو صاحبه
        const existingProperty = await db.listing.findUnique({
            where: { id: propertyId }
        });

        if (!existingProperty) {
            throw new Error("العقار غير موجود");
        }

        if (existingProperty.userId !== userId) {
            throw new Error("لا تملك صلاحية تعديل هذا العقار");
        }

        // 3. تنفيذ التعديل في قاعدة البيانات (Prisma)
        const updatedProperty = await db.listing.update({
            where: { id: propertyId },
            data: {
                title: data.title,
                description: data.description,
                price: data.price ? parseInt(data.price) : undefined,
                category: data.category,
                city: data.city,
                roomCount: data.roomCount ? parseInt(data.roomCount) : undefined,
                // أضيفي أي حقول أخرى موجودة في السكيما الخاصة بكِ هنا
            },
        });

        // 4. تحديث البيانات في الصفحات المرتبطة
        revalidatePath("/display-properties");
        revalidatePath(`/properties/${propertyId}`);

        return { success: true, data: updatedProperty };

    } catch (error) {
        console.error("UPDATE_ACTION_ERROR:", error.message);
        return { success: false, error: error.message };
    }
}