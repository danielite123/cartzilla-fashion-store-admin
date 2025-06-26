// hooks/useActiveLink.tsx
"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function useActiveLink(targetPath: string): boolean {
  const pathname = usePathname();

  return useMemo(() => pathname === targetPath, [pathname, targetPath]);
}
