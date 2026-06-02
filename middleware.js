import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// منحدد إن أي شي بيبدأ بـ /admin لازم يكون محمي
const isProtectedRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    // هاد السطر بيجبر المستخدم يسجل دخول إذا حاول يدخل للأدمن
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};