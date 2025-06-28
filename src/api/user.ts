import { endpoints, fetcher } from "@/lib/axios";
import { useAuthStore } from "@/store/auth-store";
import { IUserItem } from "@/types/user";
import { queryKeys } from "@/utils/react-query";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

export function useGetUser(option?: { enabled: boolean }) {
  const setUser = useAuthStore((state) => state.setUser);
  const accessToken = useAuthStore((s) => s.accessToken);

  const shouldFetch = option?.enabled ?? !!accessToken;

  const { data, isLoading, refetch } = useQuery<IUserItem>({
    ...option,
    queryKey: queryKeys.user.root,
    queryFn: () => fetcher(endpoints.user.profile),
    enabled: shouldFetch,
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  return useMemo(
    () => ({
      profileData: data,
      profileRefetch: refetch,
      profileLoading: isLoading,
    }),
    [data, isLoading, refetch]
  );
}
