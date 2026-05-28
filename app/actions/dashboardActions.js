import prisma from "@/lib/prisma"; // استيراد البريسما الصحيح الخاص بمشروعك

export async function getDashboardStats() {
  try {
    // 1. إجمالي العقارات
    const totalProperties = await prisma.property.count();
    
    // 2. مجموع المعاملات المالية 
    const transactionsSum = await prisma.transaction.aggregate({
      _sum: {
        amount: true // تأكد أن اسم الحقل في جدول الـ transaction عندك هو amount
      }
    });
    const totalTransactions = transactionsSum._sum.amount || 0;
    
    // 3. طلبات التوثيق المعلقة
    const verificationRequests = await prisma.verificationRequest.count({ 
      where: { status: 'PENDING' } 
    });

    // إرجاع البيانات بدون التذاكر
    return {
      totalProperties,      // الرقم الإجمالي للعقارات
      totalTransactions,    // مجموع المعاملات المادية
      verificationRequests  // عدد طلبات التوثيق المعلقة
    };
  } catch (error) {
    console.error("فشل جلب بيانات لوحة التحكم:", error);
    return { totalProperties: 0, totalTransactions: 0, verificationRequests: 0 };
  }
}