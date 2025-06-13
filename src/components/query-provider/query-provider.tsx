/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
// eslint-disable-next-line import/no-extraneous-dependencies
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { toast } from "sonner";

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (err: any) => {
      if (err?.status === 403 && err?.data?.message) {
        toast.error(err.data.message);
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (err: any) => {
      if (err?.data?.message) {
        if (err?.status === 403 || err?.status === 409) {
          toast.error(err.data.message);
        }
      }
    },
  }),
});

export default function QueryProvider({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
