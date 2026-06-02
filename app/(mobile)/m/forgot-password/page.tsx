import React from "react";
import ForgotPassword from "@/components/mobile/auth/ForgotPassword"; // تأكدي من تعديل المسار حسب مشروعكِ

export const metadata = {
  title: "نسيت كلمة المرور - عقارك",
  description: "استعادة الوصول إلى حسابك في تطبيق عقارك",
};

export default function ForgotPasswordPage() {
  return <ForgotPassword />;
}
