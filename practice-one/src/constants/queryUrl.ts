import { CURRENT_PAGE, PAGE_SIZE } from './pagination';

// Types
import { ProductFilterParams } from '@/interfaces';

export const QUERY_FILTER_URL = {
  PAGINATION: (page: number, pageSize: number) =>
    (page &&
      pageSize &&
      `&pagination[pageSize]=${pageSize}&pagination[page]=${page}`) ||
    '',
  BY_CATEGORY: (category: string) => `&filters[category][$eq]=${category}`,
};

export const QUERY_URL = {
  PRODUCTS: '?populate[store][fields][0]=*',
  PRODUCTS_BY_PARAMS: ({
    category = '',
    page = CURRENT_PAGE,
    pageSize = PAGE_SIZE,
  }: ProductFilterParams) =>
    `?populate[store][fields][0]=*${QUERY_FILTER_URL.BY_CATEGORY(category)}${QUERY_FILTER_URL.PAGINATION(
      page,
      pageSize,
    )}`,
};
