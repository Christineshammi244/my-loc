"use server"

import prisma from "@/lib/prisma"; 
import { revalidatePath } from "next/cache";

export async function createTransaction(data) {
  try {
    const transaction = await prisma.transaction.create({
      data: {
        amount: parseFloat(data.amount),
        status: "PENDING",
        reference: "TRX-" + Math.random().toString(36).toUpperCase().substring(2, 8),
        
        // ربط المعاملة باليوزر
        user: {
          connect: { id: data.userId }
        },
        
        // ربط المعاملة بالعقار (تحويل لـ Int لأن id العقار عندك رقم)
        property: {
          connect: { id: parseInt(data.propertyId) }
        },

        // باقي البيانات
        otherPartyName: data.otherPartyName,
        otherPartyPhone: data.otherPartyPhone,
        otherPartyAddress: data.otherPartyAddress
      },
    });

    revalidatePath("/"); // لتحديث البيانات في الصفحة
    return { success: true, transaction };
  } catch (error) {
    console.error("Error creating transaction:", error);
    return { success: false, error: error.message };
  }
}// إضافة عملية الموافقة ونقل الملكية
export async function approveTransaction(
  transactionId,
  newOwnerId,
  propertyId,
) {
  try {
    // 1. تحديث حالة المعاملة لتصبح مكتملة
    await prisma.transaction.update({
      where: { id: transactionId },
      data: { status: "COMPLETED" },
    });

    // 2. نقل ملكية العقار للمالك الجديد (المشتري)
    await prisma.property.update({
      where: { id: Number(propertyId) || 1 },
      data: { userId: newOwnerId },
    });

    revalidatePath("/admin/transactions"); // تحديث الصفحة لظهور الحالة الجديدة
    return { success: true };
  } catch (error) {

    console.error("Error approving transaction:", error);
    return { success: false, error: error.message };
  }
}
export async function rejectTransaction(transactionId) {
  try {
    await prisma.transaction.update({
      where: { id: transactionId },
      data: { status: "REJECTED" }, // تغيير الحالة إلى مرفوضة
    });

    revalidatePath("/admin/transactions");
    return { success: true };
  } catch (error) {
    console.error("Error rejecting transaction:", error);
    return { success: false, error: error.message };
  }
}