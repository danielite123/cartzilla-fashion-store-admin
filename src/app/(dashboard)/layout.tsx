"use client";

import { ReactNode } from "react";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import Header from "@/components/layout/header";
import SideBar from "@/components/layout/sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  useAuthGuard();

  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-4 bg-neutral">
          {children}
        </main>
      </div>
    </div>
  );
}
