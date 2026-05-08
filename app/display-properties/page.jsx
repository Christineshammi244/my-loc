import prisma from "@/lib/prisma"; // تأكدي أن هذا الملف موجود في مجلد lib
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { deletePropertyAction } from "../actions/property";
import { revalidatePath } from "next/cache";
export default async function DisplayProperties() {
  const { userId } = await auth(); 
  const properties = await prisma.property.findMany({
    orderBy: { createdAt: "desc" },
  });
async function handleDelete(formData) {
    "use server";
    const propertyId = parseInt(formData.get("propertyId"));
    await deletePropertyAction(propertyId);
    
    // هذا السطر مهم جداً لتحديث الصفحة فوراً بعد الحذف
    // تأكدي من استيراده في الأعلى: import { revalidatePath } from "next/cache";
    revalidatePath("/display-properties");
  }
  return (
    <div style={{ padding: "40px", backgroundColor: "#f4f7f6", minHeight: "100vh", direction: "rtl" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1 style={{ color: "#333" }}>🏠 العقارات المتاحة</h1>
        <Link href="/add-property">
          <button style={{ backgroundColor: "#3498db", color: "white", padding: "10px 20px", borderRadius: "8px", border: "none", cursor: "pointer" }}>
            + إضافة عقار
          </button>
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "25px" }}>
        {properties.map((item) => (
          <div key={item.id} style={{ backgroundColor: "white", padding: "20px", borderRadius: "15px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
            <h3 style={{ color: "#2c3e50" }}>{item.title}</h3>
            <p style={{ color: "#7f8c8d" }}>{item.description}</p>
            <div style={{ marginTop: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: "bold", color: "#27ae60" }}>{item.price}$</span>
              
              {/* هنا الأمان: زر الحذف يظهر فقط لصاحب العقار */}
              {userId === item.ownerId && (  
          <form action={handleDelete}>
    {/* نرسل الـ id تبع العقار بشكل مخفي عشان نعرف شو بدنا نحذف */}
    <input type="hidden" name="propertyId" value={item.id} />
    
    <button 
      type="submit" 
      style={{ 
        backgroundColor: "#e74c3c", 
        color: "white", 
        padding: "5px 10px", 
        borderRadius: "5px", 
        border: "none", 
        cursor: "pointer",
        marginTop: "10px" 
      }}
      onClick={(e) => {
        if (!confirm("هل أنت متأكد من حذف هذا العقار؟")) {
          e.preventDefault(); // إذا كنسل المستخدم، ما بنبعث الطلب للسيرفر
        }
      }}
    >
      حذف العقار 🗑️
    </button>
  </form>
)}
      </div>
    </div>
        ))}
    </div>
    </div>
  );
}
