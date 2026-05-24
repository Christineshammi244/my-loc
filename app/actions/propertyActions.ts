"use server";

import prisma from "@/lib/prisma"; 
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// ==========================================
// 1. دالة إضافة عقار جديد
// ==========================================
export async function addProperty(formData: any) {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "يجب تسجيل الدخول أولاً" };

    // جلب المستخدم الداخلي للحصول على المعرف المربوط بالسكيما
    const dbUser = await prisma.user.findFirst({
      where: { clerkId: userId } as any
    });
    if (!dbUser) return { success: false, error: "المستخدم غير مزامن" };

    const title = formData.get("title");
    const description = formData.get("description");
    const price = parseFloat(formData.get("price")) || 0;
    const location = formData.get("location");
    const city = formData.get("city");
    const type = formData.get("type");
    const category = formData.get("category");

    const newProperty = await prisma.property.create({
      data: {
        title,
        description,
        price,
        location,
        city,
        type,
        category,
        ownerId: dbUser.id, 
      },
    });

    revalidatePath("/m/search-results");
    return { success: true, property: newProperty };
  } catch (error) {
    console.error("ADD_PROPERTY_ERROR:", error);
    return { success: false, error: "حدث خطأ أثناء إضافة العقار" };
  }
}

// ==========================================
// 2. دالة البحث والفلترة العامة
// ==========================================
export async function searchProperties(filters: any) {
  try {
    const searchQuery = filters?.query || "";
    const typeQuery = filters?.type || "الكل";
    const decodedTypeQuery = decodeURIComponent(typeQuery).trim();
    
    const properties = await prisma.property.findMany({
      where: {
        AND: [
          searchQuery ? {
            OR: [
              { title: { contains: searchQuery } },
              { location: { contains: searchQuery } },
              { description: { contains: searchQuery } },
              { city: { contains: searchQuery } }
            ]
          } : {},
          decodedTypeQuery !== "الكل" ? { type: decodedTypeQuery } : {}
        ]
      },
      include: {
        images: true 
      },
      orderBy: { 
        createdAt: "desc" 
      }
    });

    return { success: true, data: properties };
  } catch (error) {
    console.error("SEARCH_PROPERTIES_ERROR:", error);
    return { success: false, data: [] };
  }
}

// ==========================================
// 3. دالة جلب العقارات المفلترة (الرئيسية مع منطق الغرف الكامل)
// ==========================================
export async function getProperties(params: any) {
  try {
    const { city, category, roomCount, title } = params || {};
    let query: any = {};

    if (city) {
      query.city = city;
    }

    if (category) {
      query.category = category;
    }

    if (roomCount) {
      query.rooms = { 
        gte: parseInt(roomCount) || 0 
      };
    }

    if (title) {
      query.title = {
        contains: title,
      };
    }

    const properties = await prisma.property.findMany({
      where: query,
      include: {
        images: true 
      },
      orderBy: {
        createdAt: 'desc' 
      }
    });

    return properties;
  } catch (error) {
    console.error("Error in getProperties Action:", error);
    return [];
  }
}

// ==========================================
// 4. دالة جلب عقار محدد بواسطة الـ ID (شاملة الصور والمالك)
// ==========================================
export async function getPropertyById(propertyId: string) {
  try {
    if (!propertyId) return null;

    const property = await prisma.property.findUnique({
      where: {
        id: parseInt(propertyId), 
      },
      include: {
        images: true, 
        owner: true,
      },
    });

    return property;
  } catch (error) {
    console.error("GET_PROPERTY_BY_ID_ERROR:", error);
    return null;
  }
}

// ==========================================
// 5.دالة حفظ روابط صور العقار المرفوعة على Cloudinary
// ==========================================
export async function savePropertyImages(propertyId: string, cloudinaryUrls: string[]) {
  try {
    if (!cloudinaryUrls || cloudinaryUrls.length === 0) return { success: false };

    // إدخال الصور بالتوازي لتتوافق مع SQLite وقواعد البيانات الأخرى
    await Promise.all(
      cloudinaryUrls.map((url) =>
        prisma.image.create({
          data: {
            url: url,
            propertyId: parseInt(propertyId),
          },
        })
      )
    );

    return { success: true };
  } catch (error) {
    console.error("SAVE_IMAGES_ERROR:", error);
    return { success: false, error: "فشل حفظ روابط الصور" };
  }
}


// ==========================================
// 6. دالة جلب سجل المبيعات الخاص بالمالك الحالي
// ==========================================
export async function getSalesRecord() {
  try {
    const { userId } = await auth();
    if (!userId) return [];

    // جلب العقارات المباعة التي يملكها هذا المستخدم
    const sales = await prisma.property.findMany({
      where: {
        ownerId: userId,
      },
      include: {
        images: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return sales;
  } catch (error) {
    console.error("GET_SALES_RECORD_ERROR:", error);
    return [];
  }
}

// ==========================================
// 7. دالة جلب تفاصيل طلب التحقق بواسطة المعرف
// ==========================================
export async function getVerificationRequestById(requestId: string) {
  try {
    const request = await prisma.verificationRequest.findUnique({
      where: { id: requestId },
      include: {
        property: {
          include: {
            images: true, 
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

// ==========================================
// 8. دالة جلب مشترياتي
// ==========================================
export async function getMyPurchases() {
  try {
    const purchases = await prisma.transaction.findMany({
      include: {
        property: {
          include: {
            images: true, 
          },
        },
      },
      orderBy: {
        createdAt: "desc", 
      },
    });

    return { success: true, data: purchases };
  } catch (error) {
    console.error("Error fetching purchases:", error);
    return { success: false, data: [] };
  }
}

// ==========================================
// 9. دالة جلب تفاصيل عقد المستخدم المعين
// ==========================================
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
        idCardPath: verificationData.frontImage || null,propertyDocPath: verificationData.propertyDoc || null,
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

// ==========================================
// 10. دالة إرسال الطلب النهائي وحفظ المعاملة
// ==========================================
export async function submitContractRequest(data: {
  userId: string;
  propertyId: string; 
  offerPrice: string;
  notes?: string;
}) {
  try {
    const newTransaction = await prisma.transaction.create({
      data: {
        userId: data.userId,
        reference: `REF-${Date.now()}`, 
        type: "PURCHASE", 
        amount: Number(data.offerPrice), 
        propertyId: Number(data.propertyId), 
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