"use client";

import { useAuthGuard } from "@/hooks/use-auth-guard";
import LoginView from "@/sections/auth/login-view";

export default function LoginPage() {
  const shouldRender = useAuthGuard();

  if (!shouldRender) return null;

  return <LoginView />;
}
