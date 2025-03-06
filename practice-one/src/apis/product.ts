import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

// Constants
import { API_ENDPOINT, QUERY_KEY, QUERY_URL } from '@/constants';

// Interfaces
import { ListProductResponse, ProductFilterParams } from '@/interfaces';

// Services
import { httpClient } from '@/services';

export const useGetProduct = (enabled = true) => {
  const { data, ...rest } = useQuery<ListProductResponse>({
    enabled,
    queryKey: QUERY_KEY.PRODUCT,
    queryFn: async () =>
      httpClient.get({
        endpoint: `${API_ENDPOINT.PRODUCT}${QUERY_URL.PRODUCTS}`,
      }),
  });

  return {
    data: data?.data || [],
    ...rest,
  };
};

export const useGetProductByParams = (
  enabled = true,
  params: ProductFilterParams,
) => {
  const { category } = params;
  const { data, ...rest } = useInfiniteQuery<ListProductResponse>({
    enabled,
    initialPageParam: 0,
    queryKey: QUERY_KEY.PRODUCT_BY_PARAMS({ category }),
    queryFn: async () =>
      httpClient.get({
        endpoint: `${API_ENDPOINT.PRODUCT}${QUERY_URL.PRODUCTS_BY_PARAMS({ category })}`,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.meta.pagination.next
        ? lastPage.meta.pagination.offset + 10
        : undefined,
  });

  return {
    data: data?.pages.flatMap((page) => page.data) || [],
    total: data?.pages[0].meta.pagination.total,
    ...rest,
  };
};
