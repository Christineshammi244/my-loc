"use server";

import { db } from "@/lib/db";

export async function getProperties(params) {
    try {
        // 1. فك "البارامترات" (لاحظي ضفت title هون)
        const { city, category, roomCount, title } = params;

        // 2. بناء غرض البحث (Query Object)
        let query = {};

        if (city) {
            query.city = city;
        }

        if (category) {
            query.category = category;
        }

        if (roomCount) {
            query.roomCount = { 
                gte: parseInt(roomCount) 
            };
        }

        // 3. منطق البحث النصي (الكيبورد)
        if (title) {
            query.title = {
                contains: title,
            };
        }

        // 4. جلب البيانات من الداتابيز (Prisma)
        const properties = await db.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });

        return properties;

    } catch (error) {
        console.log("Error in getProperties Action:", error);
        return [];
    }
}