import prisma from "@/lib/prisma"; 

export async function getDashboardStats() {
  try {
    // 1. إجمالي عدد العقارات
    const totalProperties = await prisma.property.count();
    
    // 2. حساب إجمالي عدد المعاملات (مهم جداً للكرت والعدادات)
    const totalTransactions = await prisma.transaction.count();

    // 3. مجموع المعاملات المالية (إذا أردتِ عرضه كـ "حجم التداولات" في مكان آخر)
    const transactionsSum = await prisma.transaction.aggregate({
      _sum: { amount: true }
    });
    const totalTransactionsAmount = transactionsSum._sum.amount || 0;
    
    // 4. طلبات التوثيق المعلقة
    const verificationRequests = await prisma.verificationRequest.count({ 
      where: { status: 'PENDING' } 
    });

    return {
      totalProperties,      
      totalTransactions, // تم إرجاع العدد الحقيقي هنا ليتوافق مع كود الصفحة الرئيسي
      totalTransactionsAmount, // خاصية إضافية بمجموع المبالغ لو احتجتيها مستقبلاً
      verificationRequests  
    };
  } catch (error) {
    console.error("فشل جلب بيانات لوحة التحكم:", error);
    return { totalProperties: 0, totalTransactions: 0, verificationRequests: 0, totalTransactionsAmount: 0 };
  }
}