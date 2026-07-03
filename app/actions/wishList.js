"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

// 1. دالة إضافة أو حذف العقار من قائمة المفضلة (Toggle)
export async function toggleWishlistAction(propertyId) {
    //const { userId } = await auth();
    const  userId  ="user_test123456";
    if (!userId) {
        return { success: false, error: "يجب تسجيل الدخول أولاً" };
    }

    try {
        const numericPropertyId = Number(propertyId);
        if (isNaN(numericPropertyId)) return { success: false, error: "معرّف غير صحيح" };

        const existing = await prisma.wishlist.findUnique({
            where: {
                userId_propertyId: {
                    userId: userId,
                    propertyId: numericPropertyId,
                }
            }
        });

        if (existing) {
            await prisma.wishlist.delete({ where: { id: existing.id } });
          //  revalidatePath(`/property-details/${numericPropertyId}`);
            revalidatePath("/m/favorites");
            revalidatePath("/","layout");
            return { success: true,error:"" };
        } else {
            await prisma.wishlist.create({
                data: { userId: userId, propertyId: numericPropertyId }
            });
            
           //re validatePath("/","layout");
                revalidatePath("/m/favorites");
                revalidatePath("/","layout");
            //revalidatePath(`/property-details/${numericPropertyId}`);
            return { success: true ,error:"" };
        }
    } catch (error) {
        console.error("TOGGLE_WISHLIST_ERROR:", error);
        return { success: false ,error:"حدث خطأ في قاعدة البيانات"};

    }
}

// 2. دالة التحقق إن كان العقار محدداً كمفضل حالياً (لعرض القلب الأحمر أو الشفاف بالواجهة)
export async function isLikedAction(propertyId) {
    try {
        const { userId } = await auth();
        if (!userId) return false;

        const numericPropertyId = Number(propertyId);
        if (isNaN(numericPropertyId)) return false;

        const existing = await prisma.wishlist.findUnique({
            where: {
                userId_propertyId: {
                    userId: userId,
                    propertyId: numericPropertyId,
                }
            }
        });

        return !!existing; // تعيد true إذا كان موجوداً، أو false إذا لم يكن موجوداً
    } catch (error) {
        console.error("IS_LIKED_ERROR:", error);
        return false;
    }
}

// 3. دالة جلب كافة العقارات المفضلة للمستخدم الحالي (لعرضها في صفحة المفضلة)
export async function getWishlist() {
    try {
       // const { userId } = await auth();
        const  userId  ="user_test123456";
        if (!userId) return [];

        // جلب عناصر المفضلة مع تضمين بيانات العقار وصوره من العلاقات المحددة بالسكيما
    const wishlistItems = await prisma.wishlist.findMany({
        where: {
        userId: userId,
        },
        include: {
        property : {
        include: {
        images: true,
            }, },
        },
        orderBy: {
        createdAt: "desc",
        },
    });

   // return wishlistItems;

        return wishlistItems.map(item => item.property);
    } catch (error) {
        console.error("GET_WISHLIST_ERROR:", error);
        return [];
    }
}