"use client";
import { usePathname } from "next/navigation";
import "./globals.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // إذا كان المسار هو "/" (الصفحة الرئيسية)، سيعرض الفوتر الغامق المليء بالمعلومات
  // في أي صفحة أخرى (مثل /login)، سيعرض الفوتر الأبيض البسيط
  const isHomePage = pathname === "/";

  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen flex flex-col">
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
