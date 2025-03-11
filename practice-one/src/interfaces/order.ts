export interface Order {
  username: string;
  phone: string;
  address: string;
  zipCode: string;
  total: number;
}

export interface OrderResponse {
  data: Order;
}
