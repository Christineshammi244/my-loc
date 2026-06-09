import React from "react";
import { Calendar } from "lucide-react";
import Sidebar from "@/components/admin/sidebar";
import Header from "@/components/admin/header";
import DashboardStats from "@/components/admin/DashboardStats";
import RecentTransactions from "@/components/admin/RecentTransactions";
import PendingReviews from "@/components/admin/PendingReviews";
import DashboardSidebarTabs from "@/components/admin/DashboardSidebarTabs";
import LocationDistribution from "@/components/admin/LocationDistribution";
import SystemStatus from "@/components/admin/SystemStatus";

// استيراد الـ Actions من المسارات الخاصة بها في مشروعك
import { getDashboardStats } from "@/app/actions/dashboardActions";
import { getRecentTransactions } from "@/app/actions/transactionActions";
import { getPendingProperties } from "@/app/actions/propertyActions";
import { getIdentityRequests } from "@/app/actions/identityActions";

// تحويل المكون إلى دالة async ليصبح Server Component حقيقي قادر على استخدام await
export default async function AdminDashboardMainPage() {
  
  // جلب البيانات ديناميكياً من الباك إيند وقاعدة البيانات عند تحميل الصفحة
  const { totalProperties, totalTransactions, verificationRequests } = await getDashboardStats();
  const recentTransactions = await getRecentTransactions(); 
  const pendingProperties = await getPendingProperties();
  const pendingVerifications = await getIdentityRequests();

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden" dir="rtl">
      {/* القائمة الجانبية المصلحة */}
      <Sidebar active="dashboard" variant="default" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* هيدر الصفحة العلوي */}
        <Header searchPlaceholder="اكتب نص البحث هنا..." />

        {/* المساحة القابلة للتمرير والشبكة البرمجية المصممة بعناية */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 bg-[#f8fafc]">
          <div className="max-w-6xl mx-auto space-y-5">
            
            {/* الهيدر العلوي الداخلي: الترحيب والتحكم في الوقت */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 flex-wrap gap-3">
              <div className="text-right">
                <h1 className="text-xl font-black text-[#008bf1]">
                  أهلاً بك، أحمد
                </h1>
                <p className="text-xs text-gray-400 mt-0.5">
                  إليك ملخص أداء منصة عقارك سوريا اليوم
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-white border border-gray-100 rounded-xl px-3 py-2 flex items-center gap-2 text-xs font-bold text-gray-600 shadow-sm">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span>آخر 30 يوم</span>
                </div>
                <button className="bg-[#008bf1] text-white px-4 py-2 rounded-xl font-bold text-xs hover:bg-[#007cd7] transition-all shadow-sm">
                  تصدير البيانات
                </button>
              </div>
            </div>

            {/* أولاً: كروت الإحصائيات الأربعة السريعة (يمرر لها الأرقام الحقيقية) */}
            <DashboardStats 
              totalProperties={totalProperties}
              totalTransactions={totalTransactions}
              verificationRequests={verificationRequests}
            />

            {/* ثانياً: شبكة التقسيم الكبيرة (قسم عريض وقسم جانبي) */}
           {/* ثانياً: شبكة التقسيم الكبيرة (قسم عريض وقسم جانبي) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              
              {/* العمود الأيمن العريض (يحتوي على الجداول الرئيسية) */}
              <div className="lg:col-span-2 space-y-5">
                {/* جدول العمليات الأخيرة */}
                <RecentTransactions transactions={recentTransactions} />
                
                {/* جدول مراجعة العقارات المعلقة */}
                <PendingReviews properties={pendingProperties} />

                {/* الصف السفلي من العمود العريض: التوزيع وحالة النظام */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="sm:col-span-2">
                    <LocationDistribution />
                  </div>
                  <div>
                    <SystemStatus />
                  </div>
                </div>
              </div>

              {/* العمود الأيسر الضيق (يحتوي على تبويبات المتابعة والدعم الفني) */}
              <div className="lg:col-span-1">
                <DashboardSidebarTabs ={pendingVerifications} />
              </div>

            </div> {/* إغلاق الـ grid الرئيسي الكبير */}
          </div> {/* إغلاق الـ max-w-6xl */}
        </main>
      </div>
    </div>
  );
}