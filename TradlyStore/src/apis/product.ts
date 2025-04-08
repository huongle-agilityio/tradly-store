import { useState } from 'react';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { useUploadImages } from './image';

// Constants
import { API_ENDPOINT, PAGE_SIZE, QUERY_KEY, QUERY_URL } from '@/constants';

// Interfaces
import {
  ListProductResponse,
  ProductFilterParams,
  ProductFormData,
  ProductPayload,
  ProductResponse,
  SortType,
} from '@/interfaces';

// Hooks
import { useMedia } from '@/hooks';

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
  const { data, ...rest } = useQuery<ListProductResponse | null>({
    enabled,
    queryKey: QUERY_KEY.PRODUCT_BY_PARAMS({
      sortCreatedAt,
      hasDiscount,
    }),
    queryFn: () =>
      withAuth((token) =>
        httpClient.get({
          endpoint: `${API_ENDPOINT.PRODUCT}${QUERY_URL.PRODUCTS({
            hasDiscount,
            sortCreatedAt,
            page: 1,
            pageSize: PAGE_SIZE,
          })}`,
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
  const { isTablet } = useMedia();
  const {
    category = '',
    title = '',
    hasDiscount,
    sortCreatedAt,
  } = params || {};

  const { data, ...rest } = useInfiniteQuery<ListProductResponse>({
    enabled,
    initialPageParam: 1,
    queryKey: QUERY_KEY.PRODUCT_BY_PARAMS({
      hasDiscount,
      category,
      title,
      sortCreatedAt,
    }),
    queryFn: async ({ pageParam = 1 }) =>
      await withAuth((token) =>
        httpClient.get({
          endpoint: `${API_ENDPOINT.PRODUCT}${QUERY_URL.PRODUCTS({
            hasDiscount,
            title,
            sortCreatedAt,
            category,
            page: Number(pageParam),
            pageSize: isTablet ? 9 : 8,
          })}`,
          token,
        }),
      ),
    getNextPageParam: (lastPage) => {
      const { page = 1, pageCount = 1 } = lastPage?.meta.pagination || {};

      return page < pageCount ? page + 1 : undefined;
    },
  });

  return {
    data: data?.pages.flatMap((page) => page?.data) || [],
    total: data?.pages[0]?.meta.pagination.total,
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
  const { data, ...rest } = useQuery<ProductResponse | null>({
    enabled: !!id,
    queryKey: [`${QUERY_KEY.PRODUCT}/${id}`],
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

/**
 * Mutation hook to delete a product by its ID.
 *
 * @returns A React Query mutation function that can be used to delete a product.
 */
export const useDeleteProduct = () =>
  useMutation<ProductResponse | null, string, string>({
    mutationFn: async (id) =>
      withAuth((token) =>
        httpClient.delete({
          endpoint: `${API_ENDPOINT.PRODUCT}/${id}`,
          token,
        }),
      ),
  });

/**
 * Mutation hook to create a product.
 *
 * @returns A React Query mutation function that can be used to create a product.
 */
export const useCreateProduct = () =>
  useMutation<ProductResponse | null, string, ProductPayload>({
    mutationFn: async (payload) =>
      withAuth((token) =>
        httpClient.post({
          endpoint: API_ENDPOINT.PRODUCT,
          payload: { data: payload },
          token,
        }),
      ),
  });

/**
 * Mutation hook to create a product.
 *
 * @returns A React Query mutation function that can be used to create a product.
 */
export const useEditProduct = () =>
  useMutation<
    ProductResponse | null,
    string,
    { id: string; data: ProductPayload }
  >({
    mutationFn: async ({ id, data }) =>
      withAuth((token) =>
        httpClient.put({
          endpoint: `${API_ENDPOINT.PRODUCT}/${id}`,
          payload: { data },
          token,
        }),
      ),
  });

/**
 * Mutation hook to create a product and upload its images.
 *
 * @returns An object that contains the `createProductWithImages` mutation function, as well as
 *   the `isLoading` state and the `uploadError` and `createError` properties of the
 *   underlying mutations.
 */
export const useCreateProductWithImages = () => {
  const { mutateAsync: uploadMutation, error: uploadError } = useUploadImages();
  const { mutateAsync: createMutation, error: createError } =
    useCreateProduct();
  const { mutateAsync: editMutation, error: editError } = useEditProduct();

  const [isLoading, setIsLoading] = useState(false);

  const createProductWithImages = async ({
    id,
    product,
    storeId,
  }: {
    id?: string;
    product: ProductFormData;
    storeId: string;
  }) => {
    try {
      setIsLoading(true);
      const hasAsset = product.slideImages.some(
        (item) => typeof item !== 'string',
      );
      const uploadedUrls = hasAsset
        ? await uploadMutation(product.slideImages)
        : (product.slideImages as string[]);

      const payload: ProductPayload = {
        ...product,
        quantity: Number(product.quantity),
        price: Number(product.price),
        discount: Number(product.discount),
        image: uploadedUrls[0],
        slideImages: uploadedUrls,
        store: storeId,
      };
      console.log('payload', payload);

      return id
        ? await editMutation({ id: id || '', data: payload })
        : await createMutation(payload);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createProductWithImages,
    isLoading,
    error: uploadError || createError || editError,
  };
};
