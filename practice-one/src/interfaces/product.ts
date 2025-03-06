import { ApiPaginationResponse } from './api';
import { Store } from './store';

export interface Product {
  id: number;
  documentId?: string;
  title: string;
  description: string;
  image: string;
  slideImages: string[];
  quantity: number;
  price: number;
  discount: number;
  priceType: string;
  location: string;
  category: string;
  store: Store;
}

export interface ProductFilterParams {
  category: string;
  page?: number;
  pageSize?: number;
}

export type ListProductResponse = ApiPaginationResponse<Product[]>;
export type ProductResponse = ApiPaginationResponse<Product>;
