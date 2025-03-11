// Interfaces
import { Cart } from '@/interfaces';

export interface CartState {
  carts: Cart[];
}

export interface CartStore extends CartState {
  setCarts: (carts: Cart[]) => void;
  addNewCart: (cart: Cart) => void;
  removeCart: (id: string) => void;
  updateQuantityItem: (id: string, quantity: number) => void;
}
