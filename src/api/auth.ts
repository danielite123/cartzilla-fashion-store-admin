/* eslint-disable @typescript-eslint/no-explicit-any */
import { endpoints, mutator } from "@/lib/axios";
import { ILoginPayload, IRegisterPayload } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";

export function useRegister() {
  const { mutateAsync, data, isPending } = useMutation<
    { accessToken: string },
    any,
    IRegisterPayload
  >({
    mutationFn: (values: IRegisterPayload) =>
      mutator({ method: "POST", data: values, url: endpoints.auth.register }),
  });

  return useMemo(
    () => ({
      register: mutateAsync,
      data,
      isRegistering: isPending,
    }),
    [mutateAsync, data, isPending]
  );
}

export function useLogin() {
  const { mutateAsync, data, isPending } = useMutation<
    { accessToken: string },
    any,
    ILoginPayload
  >({
    mutationFn: (values: ILoginPayload) =>
      mutator({ method: "POST", data: values, url: endpoints.auth.login }),
  });

  return useMemo(
    () => ({
      login: mutateAsync,
      data,
      isLogining: isPending,
    }),
    [mutateAsync, data, isPending]
  );
}
