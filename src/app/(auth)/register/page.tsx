"use client";

import { useAuthGuard } from "@/hooks/use-auth-guard";
import RegisterView from "@/sections/auth/register-view";

export default function RegisterPage() {
  const shouldRender = useAuthGuard();

  if (!shouldRender) return null;
  return <RegisterView />;
}
