"use server";

// تصحيح الاستيراد ليتجه لملف بريسما الحقيقي بمشروعك
import  prisma  from "@/lib/prisma";

export async function getProperties(params) {
    try {
        const { city, category, roomCount, title } = params || {};

        // بناء غرض البحث المطابق تماماً للحقول الحقيقية بالسكيما
        let query = {};

        if (city) {
            query.city = city;
        }

        if (category) {
            query.category = category;
        }

        if (roomCount) {
            // تصحيح اسم الحقل ليكون rooms المتوافق مع Int في السكيما الحقيقية
            query.rooms = { 
                gte: parseInt(roomCount) || 0 
            };
        }

        if (title) {
            query.title = {
                contains: title,
            };
        }

        // تصحيح جلب البيانات ليقرأ من جدول property الحقيقي، مع عمل include للصور
        const properties = await prisma.property.findMany({
            where: query,
            include: {
                images: true // ضروري لعرض صور العقارات بالصفحة الرئيسية بدون أخطاء
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return properties;

    } catch (error) {
        console.error("Error in getProperties Action:", error);
        return [];
    }
}