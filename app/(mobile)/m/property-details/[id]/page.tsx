import Image from "next/image";
import { PhoneShell } from "@/components/mobile/phone-shell";
import {getPropertyById} from "@/app/actions/propertyActions";
import { notFound } from "next/navigation";
import { Heart } from "lucide-react";
import Link from "next/link";
import {revalidatePath} from "next/cache";
import { toggleWishlistAction, isLikedAction } from "@/app/actions/wishList"
const img =
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80";
export const dynamic="force-dynamic";
export default async function PropertyDetailsPage({params}:{params:Promise<{id:string}>}) {
  const { id } =await params;
  const property =await getPropertyById(id);
    if(!property){notFound();}

  const mainImage = property?.images?.[0]?.url || img;
const numericId = Number(id);

// 2. فحص حالة القلب قبل رندرة الصفحة (باستخدام دالتكِ)
const isLiked = await isLikedAction(numericId);

// 3. ربط الـ id بالدالة لتعمل عند الضغط
  const handleToggle = async () => {
    "use server";
    await toggleWishlistAction(numericId);
    revalidatePath(`/m/property-details/${numericId}`);
  };

  return (
    <PhoneShell title="عقارك">
      <section className="rounded-2xl bg-white p-3 max-w-4xl mx-auto w-full mt-4 shadow-sm">
        <div className="relative w-full h-48 md:h-96 overflow-hidden rounded-xl">
          <Image src={mainImage} alt="property" fill className="object-cover" />
          
        </div>
      <form action={handleToggle}>
        <button type="submit" className="focus:outline-none">
          <Heart
            size={32} // هنا قمنا بتكبير حجم القلب ليصبح واضحاً وجميلاً
            fill={isLiked ? "#ef4444" : "none"}
            className={isLiked ? "fill-red-500 text-red-500" : "fill-none text-gray-400"} 
          />
        </button>
      </form>
        <h3 className="mt-3 text-3xl font-extrabold">{property.title}</h3>
        <p className="text-4xl font-extrabold text-amber-600">{property.price.toLocaleString()}دولار</p>
        <div className="mt-3 rounded-xl bg-sky-50 p-3 text-sm">{property.location}-{property.city}</div>
        <p className="mt-3 text-sm leading-7 text-slate-700">
          {property.description}
        </p>
        <div className="mt-3 h-36 rounded-xl bg-slate-100 p-3">الموقع على الخريطة</div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button className="rounded-lg bg-[#d8b236] py-2 font-bold text-white">طلب شراء</button>
          <button className="rounded-lg bg-[#24a2de] py-2 font-bold text-white">{property.owner?.phone || "لا يوجد رقم"}</button>
        </div>
      </section>
    </PhoneShell>
  );
}
