import { ApiPaginationResponse } from './api';

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
}

export interface ProductFilterParams {
  category: string;
}

export type ListProductResponse = ApiPaginationResponse<Product[]>;
export type ProductResponse = ApiPaginationResponse<Product>;
