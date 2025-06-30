import { endpoints, fetcher } from "@/lib/axios";
import { IUserItem } from "@/types/user";
import { queryKeys } from "@/utils/react-query";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export function useGetCustomerList() {
  const { data, isLoading, isFetching } = useQuery<IUserItem[]>({
    queryKey: queryKeys.customer.root,
    queryFn: () => fetcher(endpoints.customer.root),
  });

  return useMemo(
    () => ({
      customerListData: data || [],
      customerListLoading: isLoading,
      customerListFetching: isFetching,
    }),
    [data, isLoading, isFetching]
  );
}
