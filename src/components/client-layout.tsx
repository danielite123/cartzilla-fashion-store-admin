"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLoadingStore } from "@/store/loading-store";
import Loader from "./page.loader";

const AUTH_ROUTES = ["/login", "/register"];
const isAuthRoute = (path: string) => AUTH_ROUTES.includes(path);
const isDashboardRoute = (path: string) => path.startsWith("/");

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const previousPathRef = useRef<string | null>(null);
  const startLoading = useLoadingStore((state) => state.startLoading);
  const stopLoading = useLoadingStore((state) => state.stopLoading);

  const [isHydrated, setIsHydrated] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const prev = previousPathRef.current;
    const curr = pathname;

    previousPathRef.current = curr;

    const goingToAuth = isAuthRoute(curr);
    const comingFromAuth = isAuthRoute(prev || "");
    const goingToDashboard = isDashboardRoute(curr);
    const comingFromDashboard = isDashboardRoute(prev || "");

    const isInitialLoad = prev === null && (goingToAuth || goingToDashboard);

    const shouldShowLoader =
      isInitialLoad ||
      (comingFromAuth && goingToDashboard) ||
      (comingFromDashboard && goingToAuth) ||
      (isAuthRoute(curr) && isAuthRoute(prev || "") && curr !== prev);

    if (shouldShowLoader) {
      startLoading();
      setShowContent(false);

      const timeout = setTimeout(() => {
        stopLoading();
        setShowContent(true);
      }, 1500);

      return () => clearTimeout(timeout);
    } else {
      stopLoading();
      setShowContent(true);
    }
  }, [pathname, isHydrated, startLoading, stopLoading]);

  if (!isHydrated || !showContent) {
    return <Loader />;
  }

  return children;
}
