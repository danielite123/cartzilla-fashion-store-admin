"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

const pageInfo: Record<string, { title: string; tagline: string }> = {
  "/": {
    title: "Dashboard",
    tagline: "Overview of your application's performance",
  },
  "/products": {
    title: "Products",
    tagline: "Manage all your listed products here",
  },
  "/orders": {
    title: "Orders",
    tagline: "Track and manage customer orders",
  },
  "/users": {
    title: "Customers",
    tagline: "Track and manage customer",
  },
  "/categories": {
    title: "Categories",
    tagline: "Manage product groupings",
  },
  "/colors": {
    title: "Colors",
    tagline: "Manage color selections",
  },
  "/brands": {
    title: "Brands",
    tagline: "Manage brand listings",
  },
};

interface PageHeaderProps {
  className?: string;
}

export default function PageHeader({ className = "" }: PageHeaderProps) {
  const pathname = usePathname();

  const { title, tagline } = useMemo(() => {
    return (
      pageInfo[pathname] || {
        title: "Page",
        tagline: "Welcome to your dashboard",
      }
    );
  }, [pathname]);

  return (
    <div className={`font-display ${className}`}>
      <h1 className="text-[22px] font-bold text-cyprus">{title}</h1>
      <p className="text-sm text-gray-500 mt-1">{tagline}</p>
    </div>
  );
}
