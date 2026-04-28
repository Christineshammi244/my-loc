"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function DisplayProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    const res = await fetch("http://localhost:3000/api/properties", {
      cache: "no-store",
    });
    const data = await res.json();
    setProperties(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = confirm("هل أنت متأكد من حذف هذا العقار؟");

    if (confirmDelete) {
      const loadingToast = toast.loading("...جاري الحذف");
      try {
        const res = await fetch(`/api/properties/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          setProperties((prev) => prev.filter((item) => item.id !== id));
          toast.success("تم الحذف بنجاح", { id: loadingToast });
        } else {
          const errorData = await res.json();
          toast.error(errorData.error || "فشل الحذف", { id: loadingToast });
        }
      } catch (error) {
        console.error("خطأ في الاتصال:", error);
        toast.error("حدث خطأ أثناء محاولة الاتصال بالسيرفر", {
          id: loadingToast,
        });
      }
    }
  };

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>جاري التحميل...</p>
    );

  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: "#f4f7f6",
        minHeight: "100vh",
        direction: "rtl",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1 style={{ color: "#333" }}>🏠 العقارات المتاحة</h1>
        <Link href="/add-property">
          <button
            style={{
              backgroundColor: "#3498db",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            + إضافة عقار
          </button>
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "25px",
        }}
      >
        {properties.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "15px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              position: "relative",
            }}
          >
            <h3 style={{ color: "#2c3e50", marginBottom: "10px" }}>
              {item.title}
            </h3>
            <p style={{ color: "#7f8c8d", fontSize: "14px" }}>
              {item.description}
            </p>
            <div
              style={{
                marginTop: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontWeight: "bold", color: "#27ae60" }}>
                {item.price}$
              </span>
              <button
                onClick={() => handleDelete(item.id)}
                style={{
                  backgroundColor: "#e74c3c",
                  color: "white",
                  border: "none",
                  padding: "5px 12px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                حذف 🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
