import { ApiPaginationResponse } from './api';

export interface User {
  id: string;
  documentId?: string;
  email: string;
  name: string;
  avatar: string;
  username: string;
  phone: string;
}

export type UsersResponse = ApiPaginationResponse<User>;
