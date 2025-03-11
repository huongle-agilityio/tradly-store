export interface Order {
  username: string;
  phone: string;
  address: string;
  zipCode: number;
  total: number;
}

export interface OrderResponse {
  data: Order;
}
