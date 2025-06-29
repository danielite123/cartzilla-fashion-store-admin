"use client";

import { ReactNode } from "react";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/Sidebar"; // Updated import

export default function DashboardLayout({ children }: { children: ReactNode }) {
  useAuthGuard();

  return (
    <div className="flex min-h-screen">
      <SideBar />

      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-4 flex-1 overflow-auto bg-neutral">{children}</main>
      </div>
    </div>
  );
}
