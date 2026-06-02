import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import { auth } from "@clerk/nextjs/server";

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
    if (!property) return NextResponse.json({ error: "العقار غير موجود" }, { status: 404 });
    return NextResponse.json(property);
  } catch (error) {
    return NextResponse.json({ error: "خطأ في السيرفر" }, { status: 500 });
  }
}
// دالة التحديث (PATCH)
export async function PATCH(request, { params }) {
  try {
    const { userId } = auth();
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const existingProperty = await prisma.property.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingProperty) return NextResponse.json({ error: "العقار غير موجود" }, { status: 44 });
    if (existingProperty.userId !== userId) return NextResponse.json({ error: "غير مصرح لك" }, { status: 401 });

    // هنا دمجنا كودكِ مع كودها ليحدث كل شيء بما فيهم الـ status
    const updatedProperty = await prisma.property.update({
      where: { id: parseInt(id) },
      data: {
        title: body.title || undefined,
        description: body.description || undefined,
        price: body.price ? parseInt(body.price) : undefined,
        location: body.location || undefined,
        category: body.category || undefined,
        type: body.type || undefined,
        rooms: body.rooms ? parseInt(body.rooms) : undefined,
        images: body.images || undefined,
        status: status || undefined, // إضافة تحديث الـ status الخاص برفيقتكِ
      },
    });

    return NextResponse.json(updatedProperty);
  } catch (error) {
    return NextResponse.json({ error: "فشل في التحديث" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { userId } = auth();
    const { id } = await params;

    const existingProperty = await prisma.property.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingProperty) return NextResponse.json({ error: "العقار غير موجود" }, { status: 404 });
    if (existingProperty.userId !== userId) return NextResponse.json({ error: "غير مسموح" }, { status: 401 });

    await prisma.property.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: "تم الحذف بنجاح" });
  } catch (error) {
    return NextResponse.json({ error: "خطأ في الحذف" }, { status: 500 });
  }
}