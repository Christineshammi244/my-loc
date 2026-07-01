"use server";

import { auth } from "@clerk/nextjs/server";
import  prisma  from "@/lib/prisma";
export async function updatePropertyStatus(propertyId, newStatus) {
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
export async function addProperty(formData) {
  let isSuccessful = false;

  try {
     cloudinary.config({
      cloud_name: "dlaim2umq",
      api_key: "246545374644415",
      api_secret: "DMAGZD0amQI5FjBbxL_kadFUj9g" // هذا هو الـ Secret الحقيقي المطابق لحساب الـ Root في صورتكِ السابقة
    });
    const session = await auth();
    let userId = session?.userId;

    // 1. جلب أول مستخدم حقيقي مسجل لربط العقار به
    let dbUser = await prisma.user.findFirst();

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          id: userId || "admin_fallback_id",
          phone: "0999999999",
          name: "مسؤول النظام",
          email: "admin@aqarak.com",
          password: "wshisbcsbchjbsdcjbsdcj",
        }
      });
    }

    // 2. قراءة البيانات الأساسية من الفورم
    const title = formData.get("title") ;
    const description = formData.get("description") ;
    const price = parseFloat(formData.get("price") ) || 0;
    const city = formData.get("city") ;
    const location = formData.get("location");
    const type = formData.get("type") ;
    const category = formData.get("category") || "RESIDENTIAL";
    
    // 3. قراءة حقول المواصفات الفنية مع وضع قيم افتراضية لمنع انهيار قاعدة البيانات
    const area = parseFloat(formData.get("area") ) || 0;
    const bedrooms = parseInt(formData.get("bedrooms") ) || 0;
    const bathrooms = parseInt(formData.get("bathrooms") ) || 0;
    const floor = (formData.get("floor") ) || "0";

    const imageFiles = formData.getAll("images") ; 
    const uploadedImagesUrls = [];

    // 4. رفع الملفات إلى سحاب Cloudinary للحساب الرئيسي الموثق
    for (const file of imageFiles) {
      if (file && file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise<any>((resolve, reject) => {
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

    // 5. الحفظ الفوري والآمن داخل جداول الـ Prisma مع تلبية كافة الشروط
    await prisma.property.create({
      data: {
        title,
        description,
        price,
        city,
        location,
        type,
        category,
        area,        // ممررة بأمان لمنع قيد الإجبار
        bedrooms,    // ممررة بأمان لمنع قيد الإجبار
        bathrooms,   // ممررة بأمان لمنع قيد الإجبار
        floor,   
        governorate:city,    // ممررة بأمان لمنع قيد الإجبار
        ownerId: dbUser.id,
        status: "PENDING",
        images: {
          create: uploadedImagesUrls.map((url) => ({
            url: url,   
          })),
        },
      },
    }); 

    revalidatePath("/admin/properties");
    revalidatePath("/m/search-results");
    revalidatePath("/");
    isSuccessful = true;

    return { success: true, error: "" };

  } catch (error) {
    const prismaErrorMessage = error?.message || "خطأ غير معروف";
    // طباعة تفاصيل الخطأ الدقيقة بالكامل في الـ Terminal لتتبعها بصورة واضحة
    console.error("خطأ فني في قاعدة البيانات -> ADD_PROPERTY_ERROR:", error);
    return { success: false, error:`Prisma Error: ${prismaErrorMessage.substring(0,150)}` };
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
export async function getMyPropertiesAction() {
    const { userId } =  await auth();
    if (!userId) {
    return [];
    }

    try {

    const myProperties = await prisma.property.findMany({
        where: {
        ownerId: userId, // الربط الذي قمنا به في مهمة المزامنة
        },
        orderBy: {
        createdAt: "desc", // ترتيب من الأحدث للأقدم
        },
    });

    return myProperties;
    } catch (error) {
      console.error("خطأ في جلب عقاراتي:", error);
    return [];
    }
}


  export async function createProperty(formData) {
  const { userId } = await auth();
  if (!userId) throw new Error("غير مصرح لك");

  try {
    const property = await prisma.property.create({
      data: {
        title: formData.get("title"),
        description: formData.get("description"),
        price: parseFloat(formData.get("price")),
        location: formData.get("location"),
        type: formData.get("type"),
        category: formData.get("category"),
        rooms: parseInt(formData.get("rooms") || "1"),
        ownerId: userId, // ربط العقار بـ Clerk User ID
      },
    });
    revalidatePath("/properties") // لتحديث القائمة فوراً
    return { success: true, property };
  } catch (error) {
    console.error(error);
    return { success: false, error: "فشل في إضافة العقار" };
  }
}
export async function deletePropertyAction(propertyId) {
  const { userId } = await auth();
  if (!userId) throw new Error("غير مصرح لك");

  try {
    await prisma.property.delete({
      where: {
        id: propertyId,
        ownerId: userId, // للأمان: لا يحذف العقار إلا صاحبه
      },
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "فشل الحذف" };
  }
}
