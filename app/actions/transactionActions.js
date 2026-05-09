"use server";
import  prisma  from "@/lib/prisma"; // تأكدي من مسار البريسما عندك
import { revalidatePath } from "next/cache";

export async function updateTransactionStatus(transactionId, newStatus) {
  try {
    await prisma.transaction.update({
      where: { id: transactionId }, // لو الـ ID رقم، استخدمي parseInt(transactionId)
      data: { status: newStatus },
    });

    revalidatePath("/admin/transactions"); // يحدث الصفحة عشان تشوف التغيير
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "فشل تحديث الحالة" };
  }
}
export async function deleteTransaction(id) {
  try {
    await prisma.transaction.delete({
      where: { id: id },
    });
    revalidatePath("/admin/transactions");
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}