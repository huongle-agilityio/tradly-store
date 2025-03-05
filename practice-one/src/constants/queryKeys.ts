export const QUERY_KEY = {
  PRODUCT: ['products'],
  PRODUCT_BY_PARAMS: ({ category }: Partial<Record<string, string | number>>) =>
    ['products', category].filter((i) => !!i),
};
