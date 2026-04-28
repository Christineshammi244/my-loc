import prisma from "@/lib/prisma";
import { createUserAction, deleteUserAction, updateUserAction } from "@/app/actions";

export default async function UsersManagement() {
  // جلب المستخدمين مباشرة من السيرفر
  const users = await prisma.user.findMany({
    orderBy: { id: "asc" },
  });

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>إدارة المستخدمين</h1>

      {/* --- قسم إضافة مستخدم جديد --- */}
      <div style={{ background: "#f4f4f4", padding: "20px", borderRadius: "8px", marginBottom: "30px" }}>
        <h3>إضافة مستخدم جديد</h3>
        <form action={createUserAction} style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
          <input name="name" placeholder="الاسم الكامل" required style={inputStyle} />
          <input name="email" type="email" placeholder="البريد الإلكتروني" required style={inputStyle} />
          <input name="password" type="password" placeholder="كلمة المرور" required style={inputStyle} />
          <button type="submit" style={buttonStyle}>حفظ المستخدم</button>
        </form>
      </div>

      <hr />

      {/* --- قائمة المستخدمين الحاليين --- */}
      <h3>المستخدمون الحاليون</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.map((user) => (
          <li key={user.id} style={liStyle}>
            {/* فورم التحديث (الذي كان فيه خطأ <for> سابقاً) */}
            <form action={updateUserAction} style={{ display: "flex", gap: "10px", flex: 1 }}>
              <input type="hidden" name="id" value={user.id} />
              <input name="name" defaultValue={user.name} style={tableInputStyle} />
              <input name="email" defaultValue={user.email} style={tableInputStyle} />
              <button type="submit" style={updateButtonStyle}>تحديث</button>
            </form>

            {/* زر الحذف المرتبط بالأكشن */}
            <form action={async () => {
              "use server";
              await deleteUserAction(user.id);
            }}>
              <button type="submit" style={deleteButtonStyle}>حذف</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}

// --- تنسيقات بسيطة (CSS-in-JS) لجمالية الصفحة ---
const inputStyle = { padding: "10px", borderRadius: "4px", border: "1px solid #ccc" };
const tableInputStyle = { padding: "5px", border: "1px solid #ddd", borderRadius: "4px", flex: 1 };
const buttonStyle = { padding: "10px", background: "#28a745", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" };
const updateButtonStyle = { padding: "5px 10px", background: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" };
const deleteButtonStyle = { padding: "5px 10px", background: "#dc3545", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" };
const liStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", borderBottom: "1px solid #eee" };