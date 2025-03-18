import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

// Constants
import { API_ENDPOINT, PAGE_SIZE, QUERY_KEY, QUERY_URL } from '@/constants';

// Interfaces
import {
  ListProductResponse,
  ProductFilterParams,
  ProductResponse,
  SortType,
} from '@/interfaces';

// Services
import { httpClient } from '@/services';

// HOCs
import { withAuth } from '@/hocs';

/**
 * React Query hook to fetch a list of products, given filtering parameters.
 *
 * @param {SortType} [sortCreatedAt] - Sort products by creation date.
 * @param {boolean} [hasDiscount=false] - Filter products with a discount.
 * @param {boolean} [enabled=true] - Whether to enable or disable the query.
 *
 * @returns {UseQueryResult<ListProductResponse, Error>} - The result of the query.
 */
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
    queryFn: () =>
      withAuth((token) =>
        httpClient.get({
          endpoint: `${API_ENDPOINT.PRODUCT}${QUERY_URL.PRODUCTS({ hasDiscount, sortCreatedAt, page: 1, pageSize: PAGE_SIZE })}`,
          token,
        }),
      ),
  });

  return {
    data: data?.data || [],
    ...rest,
  };
};

/**
 * React Query hook to fetch a paginated list of products based on filtering parameters.
 * Utilizes infinite query for seamless pagination support.
 *
 * @param {ProductFilterParams} params - The parameters to filter products, including category, title, discount, and sort order.
 * @param {boolean} [enabled=true] - Whether to enable or disable the query.
 *
 * @returns {UseInfiniteQueryResult<ListProductResponse, Error>} - The result of the query, including product data and pagination info.
 */
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
      withAuth((token) =>
        httpClient.get({
          endpoint: `${API_ENDPOINT.PRODUCT}${QUERY_URL.PRODUCTS({ hasDiscount, title, sortCreatedAt, category, page: Number(pageParam), pageSize: PAGE_SIZE })}`,
          token,
        }),
      ),
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

/**
 * React Query hook to fetch a product by its ID.
 *
 * @param {string} id - The unique identifier of the product to fetch.
 *
 * @returns {UseQueryResult<ProductResponse, Error>} - The result of the query, including the product data.
 */
export const useGetProductById = (id: string) => {
  const { data, ...rest } = useQuery<ProductResponse>({
    queryKey: [id],
    queryFn: async () =>
      withAuth((token) =>
        httpClient.get({
          endpoint: `${API_ENDPOINT.PRODUCT}/${id}${QUERY_URL.PRODUCTS({})}`,
          token,
        }),
      ),
  });

  return {
    data: data?.data,
    ...rest,
  };
};
