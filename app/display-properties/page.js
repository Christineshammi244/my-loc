import prisma from "@/lib/prisma"; // تأكدي أن هذا الملف موجود في مجلد lib
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function DisplayProperties() {
  const { userId } = auth(); 
  const properties = await prisma.property.findMany({
    orderBy: { createdAt: "desc" },
  });

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
                <button style={{ backgroundColor: "#e74c3c", color: "white", border: "none", padding: "5px 12px", borderRadius: "5px", cursor: "pointer" }}>
                  حذف 🗑
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}