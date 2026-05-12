import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// دالة جلب البيانات (GET)
export async function GET(request, { params }) {
  try {
    // انتظار الـ params ضروري في النسخ الجديدة
    const { id } = await params; 
    const propertyId = parseInt(id);

    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      include: {
        owner: true,
        images: true,
      },
    });

    if (!property) {
      return NextResponse.json({ error: "العقار غير موجود" }, { status: 404 });
    }

    return NextResponse.json(property);
  } catch (error) {
    return NextResponse.json({ error: "خطأ في السيرفر" }, { status: 500 });
  }
}

// دالة التحديث (PATCH)
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const { status } = await request.json();

    const updated = await prisma.property.update({
      where: { id: parseInt(id) },
      data: { status: status },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "فشل التحديث" }, { status: 500 });
  }
}