"use client";
import { useState } from "react";
import Link from "next/link";
import { createPropertyAction } from "../actions";
export default function AddPropertyPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    type: "",
    category: "",
    ownerId: "1",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("تمت إضافة العقار بنجاح! ✅");
    } else {
      alert("حدث خطأ، تأكد من ملء البيانات أو وجود مستخدم رقم 1");
    }
  };
  return (
    <div style={{ padding: "40px", maxWidth: "500px", margin: "auto" }}>
      <h2>إضافة عقار جديد 🏠</h2>
      <form
        action={createPropertyAction}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          name="title"
          style={{ padding: "8px" }}
          placeholder="عنوان العقار"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <textarea
          name="description"
          style={{ padding: "8px" }}
          placeholder="الوصف"
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
        <input
          name="price"
          style={{ padding: "8px" }}
          type="number"
          placeholder="السعر"
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />
        <input
          name="location"
          style={{ padding: "8px" }}
          placeholder="الموقع"
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          required
        />
        <input
          name="type"
          style={{ padding: "8px" }}
          placeholder="النوع (شقة/فيلا)"
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          required
        />
        <input
          name="category"
          style={{ padding: "8px" }}
          placeholder="الفئة"
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          required
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            background: "blue",
            color: "white",
            cursor: "pointer",
          }}
        >
          حفظ العقار
        </button>
        <Link href="/display-properties">
          <button
            type="button"
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "10px 20px",
              marginTop: "10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            عرض كافة العقارات ←
          </button>
        </Link>
      </form>
    </div>
  );
}
