"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { LOGIN_PATH, DASHBOARD_PATH } from "@/config-global";

export const useAuthGuard = () => {
  const token = useAuthStore((state) => state.accessToken);
  const router = useRouter();
  const pathname = usePathname();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const isAuthRoute = pathname === LOGIN_PATH;

    if (!token && !isAuthRoute) {
      router.replace(LOGIN_PATH);
      return;
    }

    if (token && isAuthRoute) {
      router.replace(DASHBOARD_PATH);
      return;
    }

    setShouldRender(true);
  }, [token, pathname, router]);

  return shouldRender;
};
