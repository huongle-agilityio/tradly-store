import QueryString from 'qs';
import { CURRENT_PAGE, PAGE_SIZE } from './pagination';

// Types
import { ProductFilterParams } from '@/interfaces';

export const QUERY_URL = {
  PRODUCTS: ({
    hasDiscount = false,
    sortCreatedAt,
    category = '',
    page = CURRENT_PAGE,
    pageSize = PAGE_SIZE,
  }: ProductFilterParams) =>
    QueryString.stringify(
      {
        populate: { store: { fields: ['*'] } },
        filters: {
          ...(category ? { title: { $eqi: category } } : {}),
          ...(hasDiscount ? { discount: { $notNull: true } } : {}),
        },
        ...(sortCreatedAt ? { sort: [`createdAt:${sortCreatedAt}`] } : {}),
        pagination: { page, pageSize },
      },
      { addQueryPrefix: true, skipNulls: true, encode: false, indices: false },
    ),
};
