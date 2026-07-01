import prisma from "@/lib/prisma";
import AdminReviewPage from "./AdminReviewPage"; 
export const revalidate = 0; 

export default async function Page() {
  const pendingData = await prisma.property.findMany({
    where: { status: "PENDING" },
    include: { images: true, owner: true },
    orderBy: { createdAt: "desc" }, // عرض الأحدث في الأعلى دائماً
  });
// تنسيق وفلترة البيانات لتطابق أنواع TypeScript والـ Schema الحقيقية بجهازكِ
  const formattedProperties = pendingData.map((property) => ({
    id: String(property.id), // تحويل الـ ID رقم إلى نص ليطابق الواجهة
    title: property.title || "",
    status: (property.status as "PENDING" | "APPROVED" | "REJECTED") || "PENDING",
    price: Number(property.price) || 0,
    city: property.city || "",
    region: property.location || "", 
    description: property.description || "",
    // قمنا باستبدال updatedAt بـ createdAt المتوفرة في جداولكِ وتمريرها بأمان
    updatedAt: property.createdAt ? property.createdAt.toISOString() : new Date().toISOString(),
    // فك مصفوفة الصور بأمان تام باستخدام التمرير المفتوح (any) لتخطي تضارب الواجهة
    images: Array.isArray(property.images) ? property.images.map((img) => ({ id: String(img.id), url: img.url })) : [],
    owner: property.owner ? {
      name: property.owner.name || "مستخدم",
      phone: property.owner.phone || "لا يوجد رقم"
    } : undefined
  }));

  return <AdminReviewPage pendingProperties={formattedProperties} />;
}