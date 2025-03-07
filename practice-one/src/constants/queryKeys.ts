export const QUERY_KEY = {
  PRODUCT: ['products'],
  PRODUCT_BY_PARAMS: ({
    category,
    sortCreatedAt,
    hasDiscount,
  }: Partial<Record<string, string | number | boolean>>) =>
    ['products', category, sortCreatedAt, hasDiscount].filter((i) => !!i),
};
