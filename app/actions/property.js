"use server";

import { auth } from "@clerk/nextjs/server";
import  prisma  from "@/lib/prisma";
export async function getMyPropertiesAction() {
    const { userId } =  await auth();
    if (!userId) {
    return [];
    }

    try {

    const myProperties = await prisma.property.findMany({
        where: {
        ownerId: userId, // الربط الذي قمنا به في مهمة المزامنة
        },
        orderBy: {
        createdAt: "desc", // ترتيب من الأحدث للأقدم
        },
    });

    return myProperties;
    } catch (error) {
      console.error("خطأ في جلب عقاراتي:", error);
    return [];
    }
}


  export async function createProperty(formData) {
  const { userId } = await auth();
  if (!userId) throw new Error("غير مصرح لك");

  try {
    const property = await prisma.property.create({
      data: {
        title: formData.get("title"),
        description: formData.get("description"),
        price: parseFloat(formData.get("price")),
        location: formData.get("location"),
        type: formData.get("type"),
        category: formData.get("category"),
        rooms: parseInt(formData.get("rooms") || "1"),
        ownerId: userId, // ربط العقار بـ Clerk User ID
      },
    });
    revalidatePath("/properties") // لتحديث القائمة فوراً
    return { success: true, property };
  } catch (error) {
    console.error(error);
    return { success: false, error: "فشل في إضافة العقار" };
  }
}
export async function deletePropertyAction(propertyId) {
  const { userId } = await auth();
  if (!userId) throw new Error("غير مصرح لك");

  try {
    await prisma.property.delete({
      where: {
        id: propertyId,
        ownerId: userId, // للأمان: لا يحذف العقار إلا صاحبه
      },
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "فشل الحذف" };
  }
}