import { useCallback } from 'react';

import { useSearchParams } from './use-search-params';

export function useComputeSearchParams() {
  const searchParams = useSearchParams();

  return useCallback(
    (props: { set?: { name: string; value: string }[]; delete?: string[] }) => {
      const params = new URLSearchParams(searchParams.toString());
      props.set?.forEach((item) => params.set(item.name, item.value));

      props.delete?.forEach((item) => params.delete(item));

      return params.toString();
    },
    [searchParams]
  );
}
