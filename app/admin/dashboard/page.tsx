// استيراد جميع دوال الباك آند (Server Actions) التي جهزناها معاً
import { getDashboardStats } from "../..//actions/dashboardActions";
import { getRecentTransactions } from "../../actions/transactionActions";
import { getPendingProperties } from "../../actions/propertyActions";
import { getIdentityRequests } from "../../actions/identityActions";

// جعل المكون يعمل كـ Server Component لجلب البيانات مباشرة من السيرفر وقاعدة البيانات
export default async function AdminDashboardPage() {
  
  // 1. جلب بيانات الإحصائيات (الأرقام الثلاثة الكبيرة في الأعلى)
  const { totalProperties, totalTransactions, verificationRequests } = await getDashboardStats();

  // 2. جلب جدول المعاملات المالية الأخيرة (شراء شقة، مكتب تجاري...)
  const recentTransactions = await getRecentTransactions();

  // 3. جلب جدول الإعلانات والعقارات المعلقة التي تحتاج مراجعة الإدارة واهتمامها
  const pendingProperties = await getPendingProperties();

  // 4. جلب قائمة طلبات توثيق حسابات المستخدمين الجانبية (مثل عمار الياسمين)
  const pendingVerifications = await getIdentityRequests();
  console.log("=== إحصائيات لوحة التحكم ===", totalProperties, totalTransactions, verificationRequests);
  console.log("=== المعاملات المالية ===", recentTransactions);
  console.log("=== العقارات المعلقة ===", pendingProperties);
  console.log("=== طلبات التوثيق ===", pendingVerifications);
  return (
    <div className="p-6 dir-rtl text-right">
      <h1 className="text-2xl font-bold mb-6">لوحة تحكم إدارة عقارك - Backend Ready</h1>
      <p className="text-gray-500 mb-8">تم جلب جميع البيانات الحية من قاعدة البيانات بنجاح، بانتظار ربط الفرونت آند والتصميم.</p>

      {/* 
        ملاحظة لفريق الفرونت آند:
        - الأرقام متوفرة في: totalProperties, totalTransactions, verificationRequests
        - جدول المعاملات متوفر في مصفوفة: recentTransactions
        - جدول مراجعة العقارات متوفر في مصفوفة: pendingProperties
        - طلبات التوثيق متوفرة في مصفوفة: pendingVerifications
      */}
      
      <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-md">
        ✓ الباك آند متصل بالكامل وبانتظار أكواد تصميم الواجهة (UI Components).
      </div>
    </div>
  );
}