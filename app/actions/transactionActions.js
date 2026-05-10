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
export async function updateChecklist(transactionId, fieldName, value) {
  try {
    await prisma.transaction.update({
      where: { id: transactionId },
      data: { [fieldName]: value }, // هنا نحدث الحقل المطلوب ديناميكياً
    })
    revalidatePath("/admin/transactions") 
    return { success: true }
  } catch (error) {
    return { success: false }
  }
  revalidatePath("/admin/transactions") ;

}
// داخل ملف app/actions/transactionActions.js

export async function getStats() {
  // هون عم نطلب من بريزما تعدلنا السجلات بناءً على حالتها
  const total = await prisma.transaction.count();
  const pending = await prisma.transaction.count({ where: { status: 'PENDING' } });
  const approved = await prisma.transaction.count({ where: { status: 'COMPLETED' } });
  const rejected = await prisma.transaction.count({ where: { status: 'REJECTED' } });

  return { total, pending, approved, rejected };
}
export async function getRecentTransactions() {
  const transactions = await prisma.transaction.findMany({
    take: 10, // جلب آخر 10 عمليات
    orderBy: {
      createdAt: 'desc' // الترتيب من الأحدث للأقدم
    },
    select: {
      id: true,
      status: true,
      createdAt: true
    }
  });
  return transactions;
}
export async function getTransactionById(id) {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: id },
      // هاد السطر بيضمن إن كل البيانات (بائع، مشتري، عقار، تاريخ) توصل
      include: {
        user: true,
        property: true,
      }
    });
    return transaction;
  } catch (error) {
    console.error("Error fetching transaction:", error);
    return null;
  }
}