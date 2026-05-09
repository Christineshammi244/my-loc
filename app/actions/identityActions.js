"use server"

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// دالة للموافقة على هوية المستخدم
export async function approveIdentityAction(userId) {
    try {
        await prisma.user.update({
            where: { id: userId },
            data: { 
                isVerified: true, // تغيير الحالة لموثق
                role: "verified_user" // اختيارياً: تغيير الرتبة
            },
        });

        // تحديث الصفحة فوراً ليعرف الأدمن أن العملية تمت
        revalidatePath("/admin/identity");
        return { success: true };
    } catch (error) {
        console.error("خطأ في التوثيق:", error);
        return { success: false, error: "فشل في تحديث حالة الهوية" };
    }
}

// دالة لرفض الهوية (في حال كانت الوثائق غير واضحة)
export async function rejectIdentityAction(userId) {
    try {
        await prisma.user.update({
            where: { id: userId },
            data: { isVerified: false },
        });
        
        revalidatePath("/admin/identity");
        return { success: true };
    } catch (error) {
        return { success: false };
    }
}