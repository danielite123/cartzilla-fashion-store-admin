/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (err: any) => {
      if (err?.status === 403 && err?.data?.message) {
        throw err({ message: err.data.message });
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (err: any) => {
      if (err?.data?.message) {
        if (err?.status === 403 || err?.status === 409) {
          throw err({ message: err.data.message, variant: "error" });
        }
      }
    },
  }),
});
