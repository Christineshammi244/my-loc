import type { ReactNode } from "react";

export default function MobileRoutesLayout({ children }: { children: ReactNode }) {
  return <div className="bg-[#e8eaee]">{children}</div>;
}
