import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

// Constants
import { API_ENDPOINT, QUERY_KEY, QUERY_URL } from '@/constants';

// Interfaces
import {
  ListProductResponse,
  ProductFilterParams,
  SortType,
} from '@/interfaces';

// Services
import { httpClient } from '@/services';

export const useGetProduct = ({
  sortCreatedAt,
  hasDiscount = false,
  enabled = true,
}: {
  sortCreatedAt?: SortType;
  hasDiscount?: boolean;
  enabled?: boolean;
}) => {
  const { data, ...rest } = useQuery<ListProductResponse>({
    enabled,
    queryKey: QUERY_KEY.PRODUCT_BY_PARAMS({
      sortCreatedAt,
      hasDiscount,
    }),
    queryFn: async () =>
      httpClient.get({
        endpoint: `${API_ENDPOINT.PRODUCT}${QUERY_URL.PRODUCTS({ hasDiscount, sortCreatedAt, page: 1, pageSize: 6 })}`,
      }),
  });

  return {
    data: data?.data || [],
    ...rest,
  };
};

export const useGetProductByParams = ({
  params = {},
  enabled = true,
}: {
  params: ProductFilterParams;
  enabled?: boolean;
}) => {
  const {
    category = '',
    title = '',
    hasDiscount = false,
    sortCreatedAt,
  } = params || {};

  const { data, ...rest } = useInfiniteQuery<ListProductResponse>({
    enabled,
    initialPageParam: 1,
    queryKey: QUERY_KEY.PRODUCT_BY_PARAMS({
      hasDiscount,
      category,
      title,
    }),
    queryFn: ({ pageParam = 1 }) =>
      httpClient.get({
        endpoint: `${API_ENDPOINT.PRODUCT}${QUERY_URL.PRODUCTS({ hasDiscount, title, sortCreatedAt, category, page: Number(pageParam), pageSize: 6 })}`,
      }),
    getNextPageParam: (lastPage) => {
      const { page, pageCount } = lastPage.meta.pagination;

      return page < pageCount ? page + 1 : undefined;
    },
  });

  return {
    data: data?.pages.flatMap((page) => page.data) || [],
    total: data?.pages[0].meta.pagination.total,
    ...rest,
  };
};
