import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
try {
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const location = searchParams.get("location");
    const price = searchParams.get("price");
    const type = searchParams.get("type");
const where = {};
    if (category) where.category = category;
    if (location) where.location = location;
    if (type) where.type = type;
    if (price) where.price = parseInt(price); 
const properties = await prisma.property.findMany({
    where: where,
    });

    return NextResponse.json(properties);
} catch (error) {
    console.error(error);
    return NextResponse.json({ error: "فشل في جلب البيانات" }, { status: 500 });
}
}
    
