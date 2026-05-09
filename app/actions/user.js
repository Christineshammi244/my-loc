"use server"

import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma"; // التعديل 1: استخدام الملف الجاهز لتجنب كثرة الاتصالات
import { revalidatePath } from "next/cache";

// 1. مزامنة المستخدم (تحديث أو إنشاء)
export async function syncUser() {
    const { userId } = await auth(); // أضفنا await لتوافق Next.js 15
    if (!userId) return;

    const user = await currentUser();
    if (!user) return;
    const email = user.emailAddresses[0].emailAddress;

    // التعديل 2: استخدام upsert (إذا موجود حدثه، إذا مو موجود أنشئه)
    return await prisma.user.upsert({
        where: { id: userId },
        update: {
            name: ${user.firstName || ""} ${user.lastName || ""},
        },
        create: {
            id: userId,
            email: email,
            name: ${user.firstName || ""} ${user.lastName || ""},
            role: email === "your-email@gmail.com" ? "admin" : "user",
        },
    });
}

// 2. إضافة عقار (مع التحقق من البيانات)
export async function createPropertyAction(formData) {
    try {
        const { userId } = await auth();
        if (!userId) return { success: false, error: "يجب تسجيل الدخول أولاً" };

        // التعديل 3: التأكد من وجود القيم الأساسية قبل الحفظ
        const data = {
            title: formData.get("title"),
            description: formData.get("description"),
            price: parseFloat(formData.get("price")) || 0,
            location: formData.get("location"),
            image: formData.get("imageUrl"),
            ownerId: userId,
        };

        if (!data.title || !data.location) {
            return { success: false, error: "العنوان والموقع مطلوبان" };
        }

        await prisma.property.create({ data });

        revalidatePath("/display-properties");
        revalidatePath("/admin/properties");
        return { success: true };
    } catch (error) {
        console.error("خطأ:", error);
        return { success: false, error: "فشل في حفظ العقار" };
    }
}

// 3. حذف العقار (إضافة حماية الملكية)
export async function deletePropertyAction(id) {
    try {
        const { userId } = await auth();
        if (!userId) return { success: false, error: "غير مصرح لك" };

        // التعديل 4: التحقق أن المستخدم هو المالك قبل الحذف
        const property = await prisma.property.findUnique({
            where: { id: Number(id) }
        });

        if (!property || property.ownerId !== userId) {
            return { success: false, error: "لا تملك صلاحية حذف هذا العقار" };
        }

        await prisma.property.delete({
            where: { id: Number(id) },
        });
        
        revalidatePath("/display-properties");
        return { success: true };
    } catch (error) {
        return { success: false, error: "حدث خطأ أثناء الحذف" };
    }
}