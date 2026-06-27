import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin((?!/Login).*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();
  
  if (isAdminRoute(req) && !userId) {
    return NextResponse.redirect(new URL("/admin/Login", req.url));
  }

  if (userId) {
    const userRole = sessionClaims?.metadata?.role;
    if (isAdminRoute(req) && userRole !== "admin") {
      return NextResponse.redirect(new URL("/m", req.url));
    }
  }
});

// التعديل السليم والدائم للـ matcher ليشمل الموبايل والأدمن والأكشنز معاً ويمنع الخطأ تماماً
export const config = {
  matcher: [
"/admin(.*)" , 
"/m(.*)",
"/api(.*)",

  ],
};