"use server";
import prisma  from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
// 1. جلب الإحصائيات الحقيقية من قاعدة البيانات
export async function getStats() {
  try {
    const [total, pending, approved, rejected] = await Promise.all([
      prisma.transaction.count(),
      prisma.transaction.count({ where: { status: "PENDING" } }),
      prisma.transaction.count({ where: { status: "available" } }),
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
// 4. الموافقة النهائية على المعاملة وتفعيل العقار ليظهر بالموقع العام
export async function approveTransaction(id: string) {
  try {
    // 1. نجلب أولاً المعاملة لنعرف الـ propertyId المرتبط بها
    const transaction = await prisma.transaction.findUnique({
      where: { id },
      select: { propertyId: true }
    });

    if (!transaction || !transaction.propertyId) {
      return { success: false, error: "المعاملة أو العقار غير موجود" };
    }

    // 2. نحدث حالة المعاملة إلى COMPLETED وحالة العقار المرتبط بها إلى APPROVED
    await prisma.$transaction([
      prisma.transaction.update({
        where: { id },
        data: { status: "COMPLETED" }
      }),
      prisma.property.update({
        where: { id: transaction.propertyId },
        data: { status: "APPROVED" } // تحديث حالة العقار ليصبح متاحاً للزوار
      })
    ]);

    revalidatePath("/admin/transactions");
    revalidatePath("/"); // لتحديث الصفحة الرئيسية ليظهر العقار فوراً
    return { success: true };
  } catch (e) {
    console.error("خطأ أثناء الاعتماد:", e);
    return { success: false, error: "فشل الاعتماد" };
  }
}

// 5. رفض المعاملة وإبقاء العقار مرفوضاً أو مخفياً
export async function rejectTransaction(id: string) {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id },
      select: { propertyId: true }
    });

    await prisma.$transaction([
      prisma.transaction.update({
        where: { id },
        data: { status: "REJECTED" }
      }),
      // اختياري: إذا أردتِ تحويل حالة العقار نفسه إلى مرفوض
      ...(transaction?.propertyId ? [
        prisma.property.update({
          where: { id: transaction.propertyId },
          data: { status: "REJECTED" }
        })
      ] : [])
    ]);

    revalidatePath("/admin/transactions");
    return { success: true };
  } catch (e) {
    console.error("خطأ أثناء الرفض:", e);
    return { success: false, error: "فشل الرفض" };
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


interface SubmitContractInput {
  propertyId: number; // أو string حسب نوع المعرف لديكِ
  fullName: string;
  phone: string;
  offerPrice: string;
  notes?: string;
  // يمكنك لاحقاً إضافة روابط الملفات المرفوعة هنا إذا لزم الأمر
}

export async function submitContractRequest(input: SubmitContractInput) {
const {userId}=await auth( );
if(!userId) return {success:false,error:"لم يتم تسجيل الدخول بشكل صحيح"};

  try {
    // نقوم بإنشاء سجل جديد في جدول المعاملات
    const newTransaction = await prisma.transaction.create({
      data: {
      
    reference: `REF-${Date.now()}` ,
    amount:parseFloat(input.offerPrice)||0,
        status: "PENDING", // حالة الطلب الافتراضية بانتظار المراجعة
        propertyId: input.propertyId,
        type:"purchases",
        userId,
      },
    });

    return { success: true, message: "تم إرسال طلبك بنجاح وجاري مراجعته!" };
  } catch (error) {
    console.error("Error submitting contract:", error);
    return { success: false, message: "حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مجدداً." };
  }
}