import { AdminShell } from "@/components/admin/admin-shell";
import { IdentityView } from "./identity-view";

export default function IdentityPage() {
  return (
    <AdminShell
      activeNav="identity"
      searchPlaceholder="بحث عن مستخدم أو طلب..."
      sidebarVariant="identity"
    >
      <IdentityView />
    </AdminShell>
  );
}
