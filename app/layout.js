import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ClerkProvider, UserButton, SignInButton } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "موقع العقارات الخاص بي",
  description: "أفضل العقارات بضغطة زر",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="ar" dir="rtl">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Toaster position="top-center" />
          
          {/* --- شريط التنقل العلوي (Navbar) --- */}
          <header className="flex justify-between items-center p-5 bg-white border-b shadow-sm">
            <div className="font-bold text-xl text-blue-600">عقاراتي 🏠</div>
            
            <nav>
              {/* يظهر هذا الجزء فقط إذا كان المستخدم غير مسجل دخول */}
          
                <SignInButton mode="modal">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">
                    تسجيل الدخول
                  </button>
                </SignInButton>
              

              {/* يظهر هذا الجزء فقط إذا كان المستخدم مسجل دخول */}
              
                <div className="flex items-center gap-4">
                  <a href="/add-property" className="text-gray-600 hover:text-blue-600 font-medium">إضافة عقار</a>
                  <UserButton afterSignOutUrl="/" />
                </div>
          
            </nav>
          </header>

          {/* محتوى الصفحة الرئيسي */}
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
