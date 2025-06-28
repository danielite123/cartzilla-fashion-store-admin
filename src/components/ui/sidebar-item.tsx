"use client";

import Link from "next/link";
import useActiveLink from "@/hooks/useActiveLink";

interface SidebarNavItemProps {
  href: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  collapsed?: boolean;
}

export default function SidebarNavItem({
  href,
  name,
  icon,
  collapsed,
}: SidebarNavItemProps) {
  const isActive = useActiveLink(href);
  const Icon = icon;

  return (
    <Link href={href}>
      <div
        className={`flex items-center gap-2 px-3 py-2 rounded-md w-full cursor-pointer transition-all duration-300
        ${collapsed ? "justify-center min-h-[40px]" : "pl-4"}
        ${
          isActive
            ? "bg-ocean-green text-white font-semibold"
            : "hover:bg-gray-100 active:bg-gray-200 text-neutral-500"
        }`}
      >
        <Icon
          className={`w-5 h-5 ${
            isActive ? "text-white " : "text-neutral-500 "
          } transition-colors duration-300`}
        />
        {!collapsed && (
          <span className="font-display text-[14px] truncate">{name}</span>
        )}
      </div>
    </Link>
  );
}
