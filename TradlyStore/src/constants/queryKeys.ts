export const QUERY_KEY = {
  PRODUCT: ['products'],
  PRODUCT_BY_PARAMS: ({
    category,
    sortCreatedAt,
    hasDiscount,
    title,
    page,
    storeId,
    pageSize,
  }: Partial<Record<string, string | number | boolean>>) =>
    [
      'products',
      category,
      title,
      sortCreatedAt,
      hasDiscount,
      storeId,
      page,
      pageSize,
    ].filter((i) => i !== undefined && i !== null),
};
