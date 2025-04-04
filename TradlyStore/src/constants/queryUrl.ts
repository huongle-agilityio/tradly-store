import QueryString from 'qs';
import { CURRENT_PAGE, PAGE_SIZE } from './pagination';

// Types
import { ProductFilterParams } from '@/interfaces';

export const QUERY_URL = {
  PRODUCTS: ({
    hasDiscount = false,
    sortCreatedAt,
    category = '',
    title = '',
    storeId = '',
    page = CURRENT_PAGE,
    pageSize = PAGE_SIZE,
  }: ProductFilterParams) =>
    QueryString.stringify(
      {
        populate: { store: { fields: ['*'] } },
        filters: {
          ...(title ? { title: { $eqi: title } } : {}),
          ...(category ? { category: { $eqi: category } } : {}),
          ...(hasDiscount ? { discount: { $notNull: true } } : {}),
          ...(storeId ? { store: { storeId: { $eqi: storeId } } } : {}),
        },
        ...(sortCreatedAt ? { sort: [`createdAt:${sortCreatedAt}`] } : {}),
        pagination: { page, pageSize },
      },
      { addQueryPrefix: true, skipNulls: true, encode: false, indices: false },
    ),
};
