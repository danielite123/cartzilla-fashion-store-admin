"use client";

import { ReactNode } from "react";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/Sidebar"; // Updated import

export default function DashboardLayout({ children }: { children: ReactNode }) {
  useAuthGuard();

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-4 bg-neutral">
          {children}
        </main>
      </div>
    </div>
  );
}
