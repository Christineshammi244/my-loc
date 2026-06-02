import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Building2,
  Home,
  Settings,
  ShieldCheck,
  Ticket,
  Users,
  ArrowLeftRight,
} from "lucide-react";

export type NavKey =
  | "home"
  | "users"
  | "properties"
  | "transactions"
  | "identity"
  | "support"
  | "reports"
  | "settings";

export type NavItem = {
  key: NavKey;
  label: string;
  href: string;
  icon: LucideIcon;
};

export const adminNav: NavItem[] = [
  { key: "home", label: "الرئيسية", href: "/admin/dashboard", icon: Home },
  {
    key: "users",
    label: "إدارة المستخدمين",
    href: "/admin/users",
    icon: Users,
  },
  {
    key: "properties",
    label: "مراجعة العقارات",
    href: "/admin/properties/SY-4829",
    icon: Building2,
  },
  {
    key: "transactions",
    label: "طلبات المعاملات",
    href: "/admin/transactions",
    icon: ArrowLeftRight,
  },
  {
    key: "identity",
    label: "التحقق من الهوية",
    href: "/admin/identity",
    icon: ShieldCheck,
  },
  { key: "support", label: "تذاكر الدعم", href: "#", icon: Ticket },
  { key: "reports", label: "التقارير", href: "#", icon: BarChart3 },
  {
    key: "settings",
    label: "الإعدادات",
    href: "/admin/settings",
    icon: Settings,
  },
];
