import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "????? ? ???? ???????",
  description: "?????? ????? ?????? ?????? ??????",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${tajawal.variable} ${tajawal.className} h-full`}
    >
      <body className="min-h-full bg-[#f4f6f8] font-sans text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
