import { SignIn } from "@clerk/nextjs";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900">
      <SignIn 
        routing="hash" 
        forceRedirectUrl="/admin/transactions" 
      />
    </div>
  );
}