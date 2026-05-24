import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import { PhoneShell } from "@/components/mobile/phone-shell";
import { getMyComments, deleteMyComment } from "@/app/actions/commentActions";

export default async function MyCommentsPage() {
  // جلب البيانات من الأكشن المجهز بالخلفية
  const myComments = await getMyComments();

  const thumb = "https://unsplash.com";

  return (
    <PhoneShell title="تعليقاتي">
      <div className="rounded-2xl bg-white p-4">
        
        {/* أزرار التصفية العلوية الثابتة */}
        <div className="mb-3 flex border-b border-slate-200 text-sm font-bold text-[#2e84d6]">
          <button className="min-h-11 border-b-2 border-[#2e84d6] px-4 py-2">
            تعليقاتي
          </button>
          <button className="min-h-11 px-4 py-2 text-slate-500">
            التعليقات ({myComments.length})
          </button>
        </div>

        {/* عرض قائمة التعليقات الحقيقية */}
        <div className="space-y-4">
          {myComments.map((comment) => (
            <article key={comment.id} className="mb-4 rounded-2xl border border-slate-200 p-3">
              <div className="mb-2 flex items-center gap-2 text-sm text-slate-500 justify-between flex-row-reverse">
                <div className="flex items-center gap-2">
                  <span>عقار رقم {comment.propertyId}</span>
                  <div className="relative h-8 w-8 overflow-hidden rounded-full border border-slate-200">
                    <Image
                      alt="Property thumb"
                      src={thumb}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* أزرار التحكم بالتعليق */}
                <div className="flex gap-2">
                  <button className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-slate-200">
                    <Pencil className="h-4 w-4" />
                  </button>
                  
                  <form
                    action={async () => {
                      "use server";
                      await deleteMyComment(comment.id);
                    }}
                  >
                    <button type="submit" className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-50 text-red-600 transition hover:bg-red-100">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              </div>

              <p className="text-right text-slate-700 font-medium px-1">
                {comment.content}
              </p>
            </article>
          ))}

          {myComments.length === 0 && (
            <p className="text-center text-slate-400 py-8">لم تقم بكتابة أي تعليقات بعد.</p>
          )}
        </div>
      </div>
    </PhoneShell>
  );
}