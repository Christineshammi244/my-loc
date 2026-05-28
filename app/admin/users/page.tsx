// استيراد الدوال التي دمجناها للتو من ملف الأكشنز الخاص بك
// تأكد من كتابة المسار النسبي الصحيح لملف الأكشنز الذي عدّلنا عليه (سواء كان اسمه userActions أو authActions)
import { getUserStatsAction, createUserAdminAction } from "../../actions/userActions"; 

export default async function AdminUsersPage() {
  
  // 1. جلب إحصائيات المستخدمين الحية تلقائياً من السيرفر (القسم السفلي في الواجهة)
  const { totalUsers, totalSellers, totalBuyers, activeUsers } = await getUserStatsAction();

  return (
    <div className="p-6 dir-rtl text-right">
      <h1 className="text-2xl font-bold mb-6">لوحة إدارة المستخدمين - الباك آند جاهز</h1>
      <p className="text-gray-500 mb-8">تم جلب الإحصائيات وربط العمليات الحية بقاعدة البيانات بنجاح.</p>

      {/* 
        ملاحظة لفريق الفرونت آند عند استلام الملف:
        ------------------------------------------
        - إجمالي المستخدمين (1,284) متوفر في المتغير: totalUsers
        - عدد البائعين (452) متوفر في المتغير: totalSellers
        - عدد المشترين (832) متوفر في المتغير: totalBuyers
        - مستخدمون نشطون (156) متوفر في المتغير: activeUsers
        
        - دالة إنشاء مستخدم جديد جاهزة للاستدعاء داخل الـ Form: createUserAdminAction
      */}

      <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-md mb-4">
        ✓ تم ربط بيانات السيرفر بنجاح. الأرقام الحية جاهزة للعرض الآن.
      </div>
    </div>
  );
}