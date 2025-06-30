"use client";

import { ReactNode } from "react";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/Sidebar"; // Updated import

export default function DashboardLayout({ children }: { children: ReactNode }) {
  useAuthGuard();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0">
        <Header />

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 bg-neutral">
          <div className="h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
