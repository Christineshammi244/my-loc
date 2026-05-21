"use server";

import prisma  from "@/lib/prisma"; // تأكد من مسار إعداد prisma في مشروعك

export async function getVerificationRequestById(requestId: string) {
  try {
    const request = await prisma.verificationRequest.findUnique({
      where: { id: requestId },
      include: {
      property: {
          include: {
            images: true, // جلب مصفوفة الصور الخاصة بالعقار
          },
        },
      },
    });

    return { success: true, data: request };
  } catch (error) {
    console.error("Error fetching verification request:", error);
    return { success: false, error: "فشل في جلب تفاصيل الطلب" };
  }
}

export async function getMyPurchases() {
  try {
    // نقوم بجلب المعاملات مع تضمين العقار والصور المرتبطة به
    const purchases = await prisma.transaction.findMany({
      include: {
        property: {
          include: {
            images: true, // جلب مصفوفة الصور الخاصة بالعقار
          },
        },
      },
      orderBy: {
        createdAt: "desc", // ترتيب من الأحدث للأقدم
      },
    });

    return { success: true, data: purchases };
  } catch (error) {
    console.error("Error fetching purchases:", error);
    return { success: false, data: [] };
  }
}
export async function getUserContractDetails(propertyId: string) {
  try {
    const verificationData = await prisma.verificationRequest.findFirst({
      where: {
        propertyId: Number(propertyId),
      },
      include: {
        user: true,
        property: true,
      },
    });

    if (!verificationData) {
      const propertyOnly = await prisma.property.findUnique({
        where: { id: Number(propertyId) },
        include: { owner: true }
      });

      if (!propertyOnly) {
        return { success: false, message: "العقار المطلوب غير موجود." };
      }

      return {
        success: true,
        data: {
          fullName: propertyOnly.owner?.name || "لا يوجد اسم مسجل",
          phone: propertyOnly.owner?.phone || "لا يوجد رقم هاتف",
          offerPrice: propertyOnly.price ? String(propertyOnly.price) : "0",
          notes: "",
          idCardPath: null, 
          propertyDocPath: null,
          isPriceMatched: false,
          isSigned: false,
          isContractReviewed: false,
        }
      };
    }

    return {
      success: true,
      data: {
        fullName: verificationData.user?.name || "لا يوجد اسم مسجل",
        phone: verificationData.user?.phone || "لا يوجد رقم هاتف",
        offerPrice: verificationData.property?.price ? String(verificationData.property.price) : "0", 
        notes: verificationData.adminNotes || "", 
        idCardPath: verificationData.frontImage || null, 
        propertyDocPath: verificationData.propertyDoc || null,
        
        // 👇 هذا هو التعديل الهام: تمرير القيم الحقيقية من السيرفر للفرونت إند
        isPriceMatched: !!verificationData.isPriceMatched,
        isSigned: !!verificationData.isSigned,
        isContractReviewed: !!verificationData.isContractReviewed,
      }
    };

  } catch (error) {
    console.error("Error fetching data from DB:", error);
    return { success: false, message: "حدث خطأ غير متوقع في السيرفر" };
  }
}

/**
 * 2. دالة إرسال الطلب النهائي وحفظ المعاملة في جدول Transaction
 */
export async function submitContractRequest(data: {
  userId: string;
  propertyId: string; // إدخال معرف العقار كـ string أو تحويله لـ number حسب السكيما
  offerPrice: string;
  notes?: string;
}) {
  try {
    const newTransaction = await prisma.transaction.create({
      data: {
        userId: data.userId,
        reference:` REF-${Date.now()}`, // كود مرجعي تلقائي فريد
        
        // الحقول المطلوبة التي تسببت في ظهور الخطأ تم إضافتها هنا:
        type: "PURCHASE", // يمكنك تغيير النوع حسب المسموح به في الـ Enum أو السكيما لديك (مثلاً "عقد" أو "شراء")
        amount: Number(data.offerPrice), // تحويل السعر الحقيقي إلى رقم ليطابق السكيما
        propertyId: Number(data.propertyId), // ربط المعاملة بالعقار المختار ديناميكياً
        
        // إذا كان هناك حقل للملاحظات في جدول Transaction يمكنك تفعيله هنا:
        // notes: data.notes 
      },
    });

    return { 
      success: true, 
      message: "تم حفظ المعاملة وإرسال طلبك بنجاح الحقيقي وجاري مراجعته!", 
      transaction: newTransaction 
    };

  } catch (error) {
    console.error("Error creating transaction:", error);
    return { success: false, message: "حدث خطأ أثناء حفظ طلبك في قاعدة البيانات" };
  }
}
// أضيفي هذه الدالة في نهاية ملف propertyActions.ts
export async function getPropertyById(propertyId: string) {
  try {
    const property = await prisma.property.findUnique({
      where: {
        id: Number(propertyId),
      },
      include: {
        owner: true, // أو العلاقة المحددة للمالك لديكِ
      }
    });
    return property;
  } catch (error) {
    console.error("Error in getPropertyById:", error);
    return null;
  }
}