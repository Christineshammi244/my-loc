"use server";

import prisma from "@/lib/prisma"; 
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

import fs from "fs/promises";
import path from "path";
 // تأكدي من مسار استيراد Prisma المتطابق لمشروعك
import { v2 as cloudinary } from "cloudinary"; 
import { redirect } from "next/navigation";
export interface PropertyParams {
  id?: string;
  city?: string;
  category?: string;
  roomCount?: string;
  title?: string;
  price?: number;
  type?: string;
  query?: string;
}
// واجهة مخصصة لنتيجة العملية (اختياري، لترتيب الـ Types)
type ActionResult = { success: boolean; error?: string; property?: PropertyParams };
export async function updatePropertyStatus(propertyId: string, newStatus: "APPROVED" | "REJECTED" | string ): Promise<ActionResult> {
  try {
    await prisma.property.update({
      where: { id: Number(propertyId) },
      data: { status: newStatus },
    });
    revalidatePath("/admin/property");
    revalidatePath("/m/search-results");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error(error);
    throw new Error("فشلت عملية تحديث حالة العقار");
  }
}
export async function addProperty(formData: FormData): Promise<void | { success: boolean; error: string }> {
  try {
    // 1. الاتصال المحلي الفوري لتخطي كاش Turbopack
    const prisma = new (await import("@prisma/client")).PrismaClient();

    // 2. إعدادات Cloudinary المباشرة لحساب الـ Root
    // إعدادات Cloudinary المباشرة لحساب الـ Root مع التأكد من مطابقة الـ Secret
    const cloudinary = (await import("cloudinary")).v2;
    cloudinary.config({
      cloud_name: "dlaim2umq",
      api_key: "246545374644415",
      api_secret: "DMAGZD0amQI5FjBbxL_kadFUj9g",
    });

    // 3. الاعتماد الكامل على مستخدم حقيقي من قاعدة البيانات
    const session = await auth();
    const clerkUserId = session?.userId;

    let dbUser = null;

    if (clerkUserId) {
      dbUser = await prisma.user.findUnique({
        where: { id: clerkUserId }
      });
    }

    if (!dbUser) {
      dbUser = await prisma.user.findFirst();
    }

    if (!dbUser) {
      return { success: false, error: "فشل الحفظ: لا يوجد أي حساب مستخدم مسجل حالياً في قاعدة بيانات Prisma" };
    }

    // 4. قراءة البيانات الأساسية من الفورم
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string) || 0;
    const city = formData.get("city") as string;
    const location = formData.get("location") as string;
    let type = formData.get("type") as string || "APARTMENT";
    const category = formData.get("category") as string || "RESIDENTIAL";
    
    if (type === "شقة" || type === "APARTMENT") type = "APARTMENT";
    if (type === "فيلا" || type === "VILLA") type = "VILLA";
    if (type === "تجاري" || type === "COMMERCIAL") type = "COMMERCIAL";
    if (type === "أرض" || type === "LAND") type = "LAND";

    // 5. قراءة المواصفات الفنية التي أضفتِها مع عزل التسميات لمنع تضارب المتغيرات
    const propertyArea = Number(formData.get("area") as string) || 120;
    const propertyBedrooms = Number(formData.get("bedrooms") as string) || 3;
    const propertyBathrooms = Number(formData.get("bathrooms") as string) || 2;
    const propertyFloor = String(formData.get("floor") as string) || "1";

    // 6. رفع الصور إلى Cloudinary
    const imageFiles = formData.getAll("images") as File[]; 
    const uploadedImagesUrls: string[] = [];

    for (const file of imageFiles) {
      if (file && file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
interface CloudinaryResult {
  secure_url: string;
}
        const uploadResult = await new Promise<CloudinaryResult>((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: "aqarak_properties" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result as unknown as CloudinaryResult);
            }
          ).end(buffer);
        });

        if (uploadResult && uploadResult.secure_url) {
          uploadedImagesUrls.push(uploadResult.secure_url);
        }
      }
    }

    // 7. الحفظ الحقيقي والصافي باسم مستخدم Clerk الحركي وبكافة حقولكِ الفنية
    await prisma.property.create({
      data: {
        title,
        description,
        price,
        city,
        location,
        type: type as any,
        category: category as any,
        area: propertyArea,         
        bedrooms: propertyBedrooms, 
        bathrooms: propertyBathrooms, 
        floor: propertyFloor,       
      
      
        // 7. التعديل النهائي والآمن لرفع الصور بالطريقتين ليتوافق مع السكيما فوراً
        status: "PENDING",
        images: { create: uploadedImagesUrls.map((url) => ({ url })) } as any,
        owner:{connect:{id:dbUser.id}}
      }});
    revalidatePath("/admin/properties");
    revalidatePath("/m/search-results");
    revalidatePath("/");

    return { success: true, error: "" };

} catch (dbError: any) {
    console.error("ADD_PROPERTY_ERROR:", dbError);
    // جلب نص الخطأ الصافي كرسالة نصية عادية جداً وبدون أي تعقيد
    const clearMessage = dbError?.message || "فشلت المعاملة بسبب حقل ناقص";
    return { success: false, error: clearMessage };
  }
}
 
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
export async function searchProperties(filters: PropertyParams) {
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
export async function getProperties(params: PropertyParams) {
  

  try {
    const { city, category, roomCount, title } = params || {};
    const query: Prisma.PropertyWhereInput= {};

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