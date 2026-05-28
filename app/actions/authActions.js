"use server";

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function loginAction(formData) {
  const identifier = formData.get('identifier')?.trim(); // بريد أو هاتف
  const password = formData.get('password');

  if (!identifier || !password) {
    return { success: false, error: "الرجاء تعبئة جميع الحقول!" };
  }

  try {
    // 1. البحث في قاعدة البيانات
    let user = await prisma.user.findUnique({ where: { email: identifier } });
    if (!user) {
      user = await prisma.user.findFirst({ where: { phone: identifier } });
    }

    // 2. إذا لم يجد المستخدم
    if (!user) {
      return { success: false, error: "الحساب غير موجود أو بيانات الاعتماد خاطئة." };
    }

    // 3. مطابقة كلمة المرور المشفرة
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { success: false, error: "كلمة المرور التي أدخلتها غير صحيحة!" };
    }

    // 4. إرجاع النتيجة للفرونت إيند في حال النجاح
    return {
      success: true,
      message: "تم تسجيل الدخول بنجاح!",
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    };

  } catch (error) {
    console.error("Login Action Error:", error);
    return { success: false, error: "حدث خطأ داخلي في السيرفر." };
  }
}