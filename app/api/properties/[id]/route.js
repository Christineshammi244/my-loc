import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const property = await prisma.property.findUnique({
      where: { id: parseInt(id) },
    });

    if (!property) {
      return NextResponse.json({ error: "العقار غير موجود" }, { status: 404 });
    }

    return NextResponse.json(property);
  } catch (error) {
    return NextResponse.json({ error: "فشل في جلب البيانات" }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

  
    const existingProperty = await prisma.property.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingProperty) {
      return NextResponse.json({ error: "لا يمكن التعديل، العقار غير موجود" }, { status: 404 });
    }
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
        images: body.images || undefined, // إذا كان عندك حقل صور
      },
    });

    return NextResponse.json(updatedProperty);
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: "فشل في تحديث البيانات" }, { status: 500 });
  }
}


export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    
    const existingProperty = await prisma.property.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingProperty) {
      return NextResponse.json({ error: "لا يمكن الحذف، العقار غير موجود" }, { status: 404 });
    }

    await prisma.property.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "تم حذف العقار بنجاح" });
  } catch (error) {
    return NextResponse.json({ error: "خطأ أثناء عملية الحذف" }, { status: 500 });
  }
}