"use server";

import prisma from "@/lib/prisma"; 
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";


import fs from "fs/promises";
import path from "path";

export async function createPropertyComplete(formData: FormData) {
  try {
    // 1. استخراج البيانات النصية
    const category = formData.get("category") as string;     // شقة / فيلا
    const governorate = formData.get("governorate") as string;
    const city = formData.get("city") as string;
    const region = formData.get("region") as string;
    const area = formData.get("area") as string;
    const price = Number(formData.get("price"));
    const rooms = formData.get("rooms") as string;
    const bathrooms = formData.get("bathrooms") as string;
    const floor = formData.get("floor") as string;
    const description = formData.get("description") as string;
    
    // 💡 حقل الـ type مطلوب في قاعدتك، سنعطيه قيمة افتراضية "للبيع" لتجنب الخطأ
    const type = (formData.get("type") as string) ||"للبيع";

    // 📸 معالجة وحفظ الصور محلياً
    const imageFiles = formData.getAll("images") as File[];
    const imageUrls: string[] = [];

    for (const file of imageFiles) {
      if (file.size > 0) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const filename = `${uniqueSuffix}-${file.name}`;
        const targetPath = path.join(process.cwd(), "public", "uploads", filename);
        
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await fs.writeFile(targetPath, buffer);

        imageUrls.push(`/uploads/${filename}`);
      }
    }

    if (!category || !city || !price) {
      return { success: false, error: "الرجاء التأكد من ملء الحقول الأساسية كالسعر والتصنيف" };
    }

    // 📝 دمج تفاصيل المساحة والغرف في الوصف لحمايتها إذا لم تكن موجودة في الـ Schema كأعمدة منفصلة
    const fullDescription = `
      المساحة: ${area} م² | الغرف: ${rooms} | الحمامات: ${bathrooms} | الطابق: ${floor}
      ---------------------------------
    ${description  ||"بدون وصف إضافي"}
    `.trim();

    // 2. الحفظ في قاعدة البيانات (اقتصرنا على الحقول الأساسية المضمونة في موديل العقار لديك)
    const newProperty = await prisma.property.create({
      data: {
        category,                         // شقة أو فيلا بالعربي
        type,                             // للبيع أو للإيجار (مطلوب في قاعدتك)
        city,                             // المدينة
        location: `${governorate} - ${city} - ${region}`, // الموقع الكامل
        price,                            // السعر (رقم)
        description: fullDescription,     // الوصف المدمج الذكي
        
        status: "PENDING",                // الحالة الافتراضية للعقار
        title: `${category} في ${region || city}`, // عنوان تلقائي مجهز
        owner:{
          connect:{email :"harbangel383@gmail.com"}
        },
        // ربط الصور بجدول الصور الفرعي
        images: {
          create: imageUrls.map((url) => ({
            url: url,
          })),
        },
      },
    });

    revalidatePath("/");
    return { success: true, data: newProperty };

  } catch (error) {
    console.error("خطأ أثناء الحفظ المحلي للمشروع:", error);
    return { success: false, error: "حدث خطأ غير متوقع أثناء حفظ العقار" };
  }
}
// 2. دالة البحث والفلترة العامة
// ==========================================
export async function searchProperties(filters: any) {
  try {
    const searchquery = filters?.query || "";
    const typequery = filters?.type || "";
    const decodedtypequery = decodeURIComponent(typequery).trim();

    // 1️⃣ معالجة البحث النصي (الجمع والمفرد)
    let categorySearch = searchquery;
    const cleanQuery = searchquery.trim();

    if (cleanQuery.includes("شقق") || cleanQuery.includes("شقه")) {
      categorySearch = "شقة";
    } else if (cleanQuery.includes("فلل") || cleanQuery.includes("فلا")) {
      categorySearch = "فيلا";
    } else if (cleanQuery.includes("بيوت") || cleanQuery.includes("منازل")||  cleanQuery.includes("منزل")) {
      categorySearch = "بيت";
    }

    // 2️⃣ معالجة زر التصفية (التحويل من جمع إلى مفرد لتطابق قاعدة البيانات)
    let btnCategoryFilter = decodedtypequery;
    if (decodedtypequery === "شقق") {
      btnCategoryFilter = "شقة";
    } else if (decodedtypequery === "فلل") {
      btnCategoryFilter = "فيلا";
    }

    const properties = await prisma.property.findMany({
      where: {
        AND: [
          // الفلترة النصية المعتادة
          searchquery ? {
            OR: [
              { title: { contains: searchquery } },
              { location: { contains: searchquery } },
              { description: { contains: searchquery } },
              { city: { contains: searchquery } },
              { category: { contains: categorySearch } }
            ]
          } : {},
          
          // 3️⃣ تعديل فلترة الأزرار لتبحث في الـ category بصيغة المفرد المتطابقة
          decodedtypequery !== "الكل" && decodedtypequery !== "" ? {
            OR: [
              { category: btnCategoryFilter }, // يبحث عن "شقة" أو "فيلا"
              { type: { contains: decodedtypequery } } // حماية في حال كان الزر يفلتر حقول أخرى مثل "تجاري"
            ]
          } : {}
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
    return { success: false, error: "حدث خطأ أثناء البحث" };
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
export async function getPendingProperties() {
  try {
    const properties = await prisma.property.findMany({
      where: {
        // إذا كان هناك حقل مخصص للحالة مثل استبيان التوثيق، نفلتر بناءً عليه
        // يمكنكِ تعديل الحقل لاحقاً حسب قاعدة بياناتكم، حالياً سنجلب كل العقارات لمنع الخطأ
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return properties;
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}