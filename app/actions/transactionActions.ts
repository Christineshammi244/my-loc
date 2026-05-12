"use server";
import prisma  from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// 1. جلب الإحصائيات الحقيقية من قاعدة البيانات
export async function getStats() {
  try {
    const [total, pending, approved, rejected] = await Promise.all([
      prisma.transaction.count(),
      prisma.transaction.count({ where: { status: "PENDING" } }),
      prisma.transaction.count({ where: { status: "COMPLETED" } }),
      prisma.transaction.count({ where: { status: "REJECTED" } }),
    ]);
    return { total, pending, approved, rejected };
  } catch (e) {
    return { total: 0, pending: 0, approved: 0, rejected: 0 };
  }
}

// 2. جلب تفاصيل معاملة معينة مع بيانات البائع
export async function getTransactionById(id: string) {
  try {
    return await prisma.transaction.findUnique({
      where: { id },
      include: { user: true,
        property:true,
      },
    });
  } catch (e) {
    return null;
  }
}

// 3. تحديث قائمة التدقيق (Checklist)
export async function updateChecklist(id: string, field: string, value: boolean) {
  try {
    await prisma.transaction.update({
      where: { id },
      data: { [field]: value }
    });
    revalidatePath("/admin/transactions");
    return { success: true, status: "complete" }; // أضفت "complete" كما في كودك المقطع
  } catch (e) {
    return { success: false, error: "فشل التحديث" };
  }
}

// 4. الموافقة النهائية على المعاملة
export async function approveTransaction(id: string) {
  try {
    await prisma.transaction.update({
      where: { id },
      data: { status: "COMPLETED" }
    });
    revalidatePath("/admin/transactions");
    return { success: true };
  } catch (e) {
    return { success: false, error: "فشل الاعتماد" };
  }
}

// 5. رفض المعاملة
export async function rejectTransaction(id: string) {
  try {
    await prisma.transaction.update({
      where: { id },
      data: { status: "REJECTED" }
    });
    revalidatePath("/admin/transactions");
    return { success: true };
  } catch (e) {
    return { success: false };
  }
}
export async function getRecentTransactions() {
  try {
    const transactions = await prisma.transaction.findMany({
      take: 5, // جلب آخر 5 معاملات فقط
      orderBy: {
        createdAt: 'desc', // الترتيب من الأحدث للأقدم
      },
      include: {
        user: true,
        property:true, // تأكدي إن الاسم مطابق لما في الـ schema (user أو seller)
      }
    });
    return transactions;
  } catch (error) {
    console.error("خطأ في جلب المعاملات:", error);
    return [];
  }
}