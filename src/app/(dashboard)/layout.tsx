"use client";

import { ReactNode } from "react";
import { useAuthGuard } from "@/hooks/use-auth-guard";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  useAuthGuard();

  return <div className="dashboard-layout">{children}</div>;
}
