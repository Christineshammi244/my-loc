"use server"

import prisma from "@/lib/prisma"; 
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs"; 
export async function createUserAction(formData) {
  try {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

   
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { success: false, error: "هذا البريد الإلكتروني مسجل بالفعل" };
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "USER",
      },
    });

    revalidatePath("/users-management"); 
    return { success: true };
  } catch (error) {
    console.error("Create User Error:", error);
    return { success: false, error: "فشل إنشاء الحساب، يرجى المحاولة لاحقاً" };
  }
}
export async function updateUserAction(formData) {
  try {
    const id = Number(formData.get("id"));
    const name = formData.get("name");
    const email = formData.get("email");

    await prisma.user.update({
      where: { id },
      data: { name, email },
    });

    revalidatePath("/users-management");
    return { success: true };
  } catch (error) {
    return { success: false, error: "فشل تحديث البيانات" };
  }
}
export async function deleteUserAction(id) {
  try {
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    revalidatePath("/users-management");
    return { success: true };
  } catch (error) {
    return { success: false, error: "لا يمكن حذف المستخدم لوجود بيانات مرتبطة به" };
  }
}
export async function createPropertyAction(formData) {
  try {
   
    const user = await prisma.user.findFirst();

    if (!user) {
      return { success: false, error: "لا يوجد مستخدمون في قاعدة البيانات. أضف مستخدماً أولاً من Prisma Studio" };
    }

  
    const title = formData.get("title");
    const description = formData.get("description");
    const price = parseFloat(formData.get("price")) || 0;
    const location = formData.get("location");
    const type = formData.get("type");
    const category = formData.get("category");

   
    const newProperty = await prisma.property.create({
      data: {
        title,
        description,
        price,
        location,
        type,
        category,
        ownerId: user.id, 
      },
    });

    console.log("تم حفظ العقار بنجاح:", newProperty);
    return { success: true };

  } catch (error) {
    console.error("خطأ أثناء الحفظ:", error);
    return { success: false, error: "حدث خطأ في السيرفر" };
  }
}


    
    
export async function deletePropertyAction(id) {
  try {
    await prisma.property.delete({
      where: { id: Number(id) },
    });
    revalidatePath("/display-properties");
    return { success: true };
  } catch (error) {
    return { success: false, error: "فشل حذف العقار" };
  }
}