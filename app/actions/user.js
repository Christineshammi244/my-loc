"use server"

import { auth, currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

// 1. مهمتكِ الأساسية: مزامنة مستخدم Clerk مع قاعدة بيانات Prisma
export async function syncUser() {
const { userId } = auth();
    if (!userId) return;

const user = await currentUser();
    if (!user) return;
const email = user.emailAddresses[0].emailAddress;

  // البحث عن المستخدم في قاعدة بياناتك
const dbUser = await prisma.user.findUnique({
    where: { email: email },
});

  // إذا لم يكن موجوداً، ننشئه (بدون كلمة سر لأن Clerk يحميها)
if (!dbUser) {
    const isAdminEmail = email === "your-email@gmail.com"; // ضعي إيميلك هنا

    await prisma.user.create({
data: {
        id: userId, // نستخدم معرف Clerk كمعرف في قاعدة بياناتنا للسهولة
        email: email,
        name: `${user.firstName || ""} ${user.lastName || ""}`,
        role: isAdminEmail ? "admin" : "user",
},
    });
    console.log("تمت المزامنة بنجاح"); }
}

// 2. تعديل كود رفيقتكِ ليعمل مع Clerk (إضافة عقار)
export async function createPropertyAction(formData) {
try {
    const { userId } = auth(); // نأخذ معرف المستخدم الحقيقي المسجل دخوله
    if (!userId) {
    return { success: false, error: "يجب تسجيل الدخول أولاً" };
    }

    const title = formData.get("title");
    const description = formData.get("description");
    const price = parseFloat(formData.get("price")) || 0;
    const location = formData.get("location");
    const type = formData.get("type");
    const category = formData.get("category");
    const imageUrl = formData.get("imageUrl"); // الرابط القادم من Cloudinary

    const newProperty = await prisma.property.create({
    data: {
        title,
        description,
        price,
        location,
        type,
        category,
        image: imageUrl,
        ownerId: userId, // نربط العقار بصاحبه الحقيقي من Clerk
        },
    });

    revalidatePath("/display-properties");
    return { success: true };
} 
catch (error) {
    console.error("خطأ أثناء الحفظ:", error);
    return { success: false, error: "حدث خطأ في السيرفر" };
}
}

// 3. كود حذف العقار (معدل ليكون أكثر أماناً)
export async function deletePropertyAction(id) {
    try {
    const { userId } = auth();
    if (!userId) return { success: false, error: "غير مصرح لك" };

    await prisma.property.delete({
where: { id: Number(id) },
    });
    
    revalidatePath("/display-properties");
    return { success: true };
} catch (error) {
    return { success: false, error: "فشل حذف العقار" };
}
}