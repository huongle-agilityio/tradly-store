import { Asset } from 'react-native-image-picker';

import { Store } from './store';
import { ApiPaginationResponse, SortType } from './api';

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
  additionalDetails: string[];
  store: Store;
}

export type ProductPayload = Omit<Product, 'id' | 'store'> & { store: string };

export interface ProductFormData {
  title: string;
  category: string;
  price: string;
  discount: string;
  quantity: string;
  location: string;
  priceType: string;
  description: string;
  slideImages: Asset[] | string[];
  additionalDetails: string[];
}

export interface ProductFilterParams {
  title?: string;
  category?: string;
  hasDiscount?: boolean;
  storeId?: string;
  sortCreatedAt?: SortType;
  page?: number;
  pageSize?: number;
}

export type ListProductResponse = ApiPaginationResponse<Product[]>;
export type ProductResponse = ApiPaginationResponse<Product>;
