"use server"

import  prisma  from "@/lib/prisma"; // التعديل الأمثل لمنع كثرة الاتصالات بقاعدة البيانات
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// 1. دالة إضافة عقار جديد (معدلة لتجلب الـ ownerId ديناميكياً لتوافق السكيما)
export async function addProperty(formData) {
    try {
        const { userId } = await auth();
        if (!userId) return { success: false, error: "يجب تسجيل الدخول أولاً" };

        // جلب المستخدم الداخلي للحصول على معرف الداتابيز المربوط بالسكيما
        const dbUser = await prisma.user.findUnique({
            where: { clerkId: userId }
        });
        if (!dbUser) return { success: false, error: "المستخدم غير مزامن" };

        const title = formData.get("title");
        const description = formData.get("description");
        const price = parseFloat(formData.get("price")) || 0;
        const location = formData.get("location");
        const city = formData.get("city");
        const type = formData.get("type");
        const category = formData.get("category");

        const newProperty = await prisma.property.create({
            data: {
                title,
                description,
                price,
                location,
                city,
                type,
                category,
                ownerId: dbUser.id, // ربط العقار بالمعرف الداخلي للمستخدم من السكيما
            },
        });

        revalidatePath("/m/search-results");
        return { success: true, property: newProperty };
    } catch (error) {
        console.error("ADD_PROPERTY_ERROR:", error);
        return { success: false, error: "حدث خطأ أثناء إضافة العقار" };
    }
}

// 2. دالة البحث والفلترة (التي يطلبها ملف page.tsx ويظهر تحتها خط أحمر)
export async function searchProperties(filters) {
    try {
        const searchQuery = filters?.query || "";
        const typeQuery = filters?.type || "الكل";

        const properties = await prisma.property.findMany({
            where: {
                AND: [
                    searchQuery ? {
                        OR: [
                            { title: { contains: searchQuery } },
                            { location: { contains: searchQuery } },
                            { description: { contains: searchQuery } }
                        ]
                    } : {},
                    typeQuery !== "الكل" ? { type: typeQuery } : {}
                ]
            },
            include: {
                images: true // جلب مصفوفة الصور المرتبطة بالعقار تلقائياً
            },
            orderBy: { 
                createdAt: "desc" 
            }
        });

        return { success: true, data: properties };
    } catch (error) {
        console.error("SEARCH_PROPERTIES_ERROR:", error);
        return { success: false, data: [] };
    }
}
export async function getProperties(params) {
    try {
        // 1. فك البارامترات القادمة من الواجهة (مع تأمين الكائن في حال كان فارغاً)
        const { city, category, roomCount, title } = params || {};

        // 2. بناء غرض البحث (Query Object) ليتوافق مع السكيما الحقيقية
        let query = {};

        if (city) {
            query.city = city;
        }

        if (category) {
            query.category = category;
        }

        if (roomCount) {
            // التوافق مع السكيما: اسم الحقل rooms ونوعه Int
            query.rooms = { 
                gte: parseInt(roomCount) || 0 
            };
        }

        if (title) {
            query.title = {
                contains: title,
            };
        }

        // 3. جلب البيانات من جدول property الحقيقي، وتضمين مصفوفة الصور المرتبطة به
        const properties = await prisma.property.findMany({
            where: query,
            include: {
                images: true // ضروري لعرض صور العقارات بالصفحة الرئيسية والواجهات بدون أخطاء
            },
            orderBy: {
                createdAt: 'desc' // جلب الأحدث أولاً دائماً
            }
        });

        return properties;

    } catch (error) {
        console.error("Error in getProperties Action:", error);
        return [];
    }
}
export async function getPropertyById(propertyId) {
    try {
    if (!propertyId) return null;

    const property = await prisma.property.findUnique({
        where: {
        id: parseInt(propertyId), // المعرف الرقمي Int من السكيما
        },
        include: {
        images: true, // يجلب مصفوفة روابط Cloudinary المرتبطة بالعقار
        },
    });

    return property;
    } catch (error) {
    console.error("GET_PROPERTY_BY_ID_ERROR:", error);
    return null;
    }
}


export async function savePropertyImages(propertyId, cloudinaryUrls) {
    try {
    if (!cloudinaryUrls || cloudinaryUrls.length === 0) return { success: false };


    const imageRecords = cloudinaryUrls.map((url) => ({
        url: url, 
        propertyId: parseInt(propertyId),
    }));

    await prisma.image.createMany({
        data: imageRecords,
    });

    return { success: true };
    } catch (error) {
    console.error("SAVE_IMAGES_ERROR:", error);
    return { success: false, error: "فشل حفظ روابط الصور" };
    }
}
export async function getSalesRecord() {
    try {
    const { userId } = await auth();
    if (!userId) return [];

    // جلب العقارات المباعة التي يملكها هذا المستخدم
    const sales = await prisma.property.findMany({
        where: {
        ownerId: userId,
        // يمكنك تفعيل الفلترة إذا كان لديكِ حقلstatus أوcategory مخصص للمبيعات بالسكيما
        },
        include: {
        images: true
        },
        orderBy: {
        createdAt: "desc"
        }
    });

    return sales;
    } catch (error) {
    console.error("GET_SALES_RECORD_ERROR:", error);
    return [];
    }
}