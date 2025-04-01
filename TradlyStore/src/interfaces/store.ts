import { ApiPaginationResponse } from './api';
import { Product } from './product';

export interface Store {
  id: number;
  documentId?: string;
  image: string;
  coverImage: string;
  name: string;
  products: Product[];
}

export type ListStoreResponse = ApiPaginationResponse<Store[]>;
