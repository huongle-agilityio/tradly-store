export interface Order {
  username: string;
  phone: string;
  address: string;
  zipCode: string;
  total: number;
}

export interface OderTracking {
  title: string;
  description: string;
  date: string;
  time: string;
  isActive?: boolean;
}

export interface OrderResponse {
  data: Order;
}
