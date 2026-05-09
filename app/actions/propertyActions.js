"use server"
import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient()

export async function addProperty(formData) {
  const title = formData.get("title")
  const description = formData.get("description")
  const price = parseFloat(formData.get("price"))

  await prisma.property.create({
    data: {
      title,
      description,
      price,
      // تأكد من ربط العقار بمستخدم إذا كان الـ Schema يتطلب ذلك
    },
  })

  revalidatePath("/properties") // لتحديث القائمة فوراً
}