"use server";

import prisma from "@/lib/prisma"; 
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation"; // 💡 استيراد دالة التوجيه المتوافقة مع السيرفر
import { v2 as cloudinary } from "cloudinary"; // 💡 الاستيراد الصحيح المخصص لرفع الملفات بالسيرفر

// إعداد مفاتيح كلاوديناري لترتبط بالـ env تلقائياً
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function addProperty(formData) {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "يجب تسجيل الدخول أولاً" };

    // جلب المستخدم الداخلي للحصول على المعرف المربوط بالسكيما
    const dbUser = await prisma.user.findFirst({
      where: { clerkId: userId } 
    });
    if (!dbUser) return { success: false, error: "المستخدم غير مزامن" };

    const title = formData.get("title");
    const description = formData.get("description");
    const price = parseFloat(formData.get("price")) || 0;
    const location = formData.get("location");
    const city = formData.get("city");
    const type = formData.get("type");
    const category = formData.get("category");
      const imageFiles = formData.getAll("images"); // يقرأ المدخلات ذات الاسم images
    const uploadedImagesUrls = [];

    for (const file of imageFiles) {
      if (file && file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // عملية الرفع للسيرفر وتحصيل روابط الصور بأمان
        const uploadResult = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: "aqarak_properties" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          ).end(buffer);
        });

        if (uploadResult && uploadResult.secure_url) {
          uploadedImagesUrls.push(uploadResult.secure_url);
        }
      }
    }
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
        status:"PENDING",
          images: {
          create: uploadedImagesUrls.map((url) => ({
            url: url,   })),
          },
      },
    }); 
    revalidatePath("/m/search-results");
        revalidatePath("/");
      //  redirect("/m/add-property?success=true");
   // return { success: true, property: newProperty };
  } catch (error) {
    console.error("ADD_PROPERTY_ERROR:", error);
    return { success: false, error: "حدث خطأ أثناء إضافة العقار" };
  }
    redirect("/m/add-property?success=true");
}
// 2. دالة البحث والفلترة (التي يطلبها ملف page.tsx ويظهر تحتها خط أحمر)
export async function searchProperties(filters) {
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
                   // typeQuery !== "الكل" ? { type: typeQuery } : {},

                decodedTypeQuery !== "الكل" ? { type:  decodedTypeQuery  } : {}
                ]
            },
            include: {
                images: true// جلب مصفوفة الصور المرتبطة بالعقار تلقائياً
            
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
export async function getProperties(params) {
    try {
        // 1. فك البارامترات القادمة من الواجهة (مع تأمين الكائن في حال كان فارغاً)
        const { city, category, roomCount, title } = params || {};

        // 2. بناء غرض البحث (Query Object) ليتوافق مع السكيما الحقيقية
        let query = {};

        if (city) {
            query.city = city;
        }

        if (category) {
            query.category = category;
        }

        if (roomCount) {
            // التوافق مع السكيما: اسم الحقل rooms ونوعه Int
            query.rooms = { 
                gte: parseInt(roomCount) || 0 
            };
        }

        if (title) {
            query.title = {
                contains: title,
            };
        }

        // 3. جلب البيانات من جدول property الحقيقي، وتضمين مصفوفة الصور المرتبطة به
        const properties = await prisma.property.findMany({
            where: query,
            include: {
                images: true // ضروري لعرض صور العقارات بالصفحة الرئيسية والواجهات بدون أخطاء
            },
            orderBy: {
                createdAt: 'desc' // جلب الأحدث أولاً دائماً
            }
        });

        return properties;

    } catch (error) {
        console.error("Error in getProperties Action:", error);
        return [];
    }
}
export async function getPropertyById(propertyId) {
    try {
    if (!propertyId) return null;

    const property = await prisma.property.findUnique({
        where: {
        id: parseInt(propertyId), // المعرف الرقمي Int من السكيما
        },
        include: {
        images: true, // يجلب مصفوفة روابط Cloudinary المرتبطة بالعقار
        owner: true
        },
    });

    return property;
    } catch (error) {
    console.error("GET_PROPERTY_BY_ID_ERROR:", error);
    return null;
    }
}


export async function savePropertyImages(propertyId, cloudinaryUrls) {
    try {
    if (!cloudinaryUrls || cloudinaryUrls.length === 0) return { success: false };


    const imageRecords = cloudinaryUrls.map((url) => ({
        url: url, 
        propertyId: parseInt(propertyId),
    }));

    await prisma.image.createMany({
        data: imageRecords,
    });

    return { success: true };
    } catch (error) {
    console.error("SAVE_IMAGES_ERROR:", error);
    return { success: false, error: "فشل حفظ روابط الصور" };
    }
}
export async function getSalesRecord() {
    try {
    const { userId } = await auth();
    if (!userId) return [];

    // جلب العقارات المباعة التي يملكها هذا المستخدم
    const sales = await prisma.property.findMany({
        where: {
        ownerId: userId,
        // يمكنك تفعيل الفلترة إذا كان لديكِ حقلstatus أوcategory مخصص للمبيعات بالسكيما
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

export async function getVerificationRequestById(requestId) {
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
export async function getUserContractDetails(propertyId) {
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
export async function submitContractRequest(data) {
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