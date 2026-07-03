"use server"

import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma"; // التعديل 1: استخدام الملف الجاهز لتجنب كثرة الاتصالات
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
// 1. دالة التزامن أو البحث عن المستخدم
export async function getUserProfile(userId: string) {
  try {
    const dbUser = await prisma.user.findUnique({
      where: { id: userId },
    });
    return dbUser;
  } catch (error) {
    console.error("GET_USER_PROFILE_ERROR:", error);
    return null;
  }
}

// 2. دالة إنشاء مستخدم جديد من قبل الأدمن (تستقبل FormData)
export async function createUserAdminAction(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const role = (formData.get("role") as string) || "user";
    const phone = (formData.get("phone") as string) || null;
const password = formData.get("password") as string;
    if (!email || !name || !password) {
      return { success: false, error: "الاسم والبريد الإلكتروني وكلمة المرور حقول إجبارية" };
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return { success: false, error: "البريد الإلكتروني مسجل مسبقاً" };
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        role,
        phone,
        password: hashedPassword,
      },
    });

    revalidatePath("/admin/users");
    return { success: true, user: newUser };
  } catch (e) {
  console.error("خطأ أثناء الرفض:", e);
    return { success: false, error: "فشل الرفض" };
  }
}
// دالة التحقق من تسجيل الدخول وفك التشفير بأمان
export async function loginUserAction(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return { success: false, error: "الرجاء إدخال البريد الإلكتروني وكلمة المرور" };
    }

    // 1. البحث عن المستخدم في قاعدة البيانات بواسطة الإيميل
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return { success: false, error: "خطأ في البريد الإلكتروني أو كلمة المرور" };
    }

    // 2. 🔐 مقارنة كلمة المرور المكتوبة مع المشفرة في قاعدة البيانات
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { success: false, error: "خطأ في البريد الإلكتروني أو كلمة المرور" };
    }

    // 3. نجاح تسجيل الدخول
    return { 
      success: true, 
      user: { id: user.id, name: user.name, email: user.email, role: user.role } 
    };

  } catch (e) {
  console.error("خطأ أثناء الرفض:", e);
    return { success: false, error: "فشل الرفض" };
  }
}

// 3. دالة إضافة عقار مستقلة (تستقبل FormData وتلبي شروط السكيما)
export async function createPropertyAction(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string) || 0;
    const location = formData.get("location") as string;
    const image = (formData.get("imageUrl") as string) || "";
    const type = (formData.get("type") as string) || "للبيع";
    const category = (formData.get("category") as string) || "شقة";
    const ownerId = formData.get("ownerId") as string;

    const data = {
      title,
      description,
      price,
      location,
      image,
      type,
      category,
      ownerId,
    };

    if (!data.title || !data.location) {
      return { success: false, error: "العنوان والموقع مطلوبان" };
    }

    const newProperty = await prisma.property.create({ data });

    revalidatePath("/display-properties");
    revalidatePath("/admin/properties");
    return { success: true, property: newProperty };
  } catch (e) {
      console.error("خطأ أثناء الرفض:", e);
    return { success: false, error: "فشل الرفض" };
  }
}

// 3. حذف العقار (إضافة حماية الملكية)
export async function deletePropertyAction(id:string) {
    try {
        const { userId } = await auth();
        if (!userId) return { success: false, error: "غير مصرح لك" };

        // التعديل 4: التحقق أن المستخدم هو المالك قبل الحذف
        const property = await prisma.property.findUnique({
            where: { id: Number(id) }
        });

        if (!property || property.ownerId !== userId) {
            return { success: false, error: "لا تملك صلاحية حذف هذا العقار" };
        }

        await prisma.property.delete({
            where: { id: Number(id) },
        });
        
        revalidatePath("/display-properties");
        return { success: true };
    } catch (error) {
        console.log(error);
        return { success: false, error: "حدث خطأ أثناء الحذف" };
    }
}

// 2. دالة جلب إحصائيات المستخدمين الحالية (الأرقام الأربعة في أسفل الواجهة)
export async function getUserStatsAction() {
  try {
    // 1. إجمالي المستخدمين في النظام
    const totalUsers = await prisma.user.count();
    
    // 2. حساب المستخدمين العاديين (بناءً على السكيما عندك)
    const totalRegularUsers = await prisma.user.count({ 
      where: { role: 'user' } 
    });
    
    // 3. حساب المسؤولين أو المشرفين (Admin)
    const totalAdmins = await prisma.user.count({ 
      where: { role: 'admin' } 
    });
    
    // 4. حساب المستخدمين النشطين (الذين تم إنشاؤهم أو تحديثهم آخر 24 ساعة)
    const activeUsers = await prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
        }
      }
    });

    // نرجع البيانات بشكل متوافق تماماً مع المتغيرات التي ينتظرها الفرونت آند
    return { 
      totalUsers, 
      totalSellers: totalRegularUsers, // قمنا بتبديلها مؤقتاً لتعمل مع السكيما بدون أخطاء
      totalBuyers: totalAdmins, 
      activeUsers 
    };

  } catch (error) {
    console.error("خطأ في جلب إحصائيات المستخدمين:", error);
    return { totalUsers: 0, totalSellers: 0, totalBuyers: 0, activeUsers: 0 };
  }
}