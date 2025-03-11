import { createWithEqualityFn } from 'zustand/traditional';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Constants
import { STORAGE_KEY } from '@/constants';

// Interfaces
import { Cart } from '@/interfaces';

// Models
import { CartState, CartStore } from './type';

export const INITIAL_CART: CartState = {
  carts: [],
};

export const useCartStore = createWithEqualityFn<CartStore>()((set, get) => ({
  ...INITIAL_CART,
  setCarts: (carts: Cart[]) => set({ carts }),
  addNewCart: async (cart: Cart) => {
    set((state) => {
      const existingCartIndex = state.carts.findIndex(
        (item) => item.id === cart.id,
      );
      let updatedCarts;

      if (existingCartIndex !== -1) {
        updatedCarts = [...state.carts];
        updatedCarts[existingCartIndex] = {
          ...updatedCarts[existingCartIndex],
          quantity: updatedCarts[existingCartIndex].quantity + cart.quantity,
        };
      } else {
        updatedCarts = [cart, ...state.carts];
      }

      return { carts: updatedCarts };
    });

    await AsyncStorage.setItem(STORAGE_KEY.CART, JSON.stringify(get().carts));
  },

  updateQuantityItem: async (id: string, quantity: number) => {
    set((state) => ({
      carts: state.carts.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      ),
    }));

    await AsyncStorage.setItem(STORAGE_KEY.CART, JSON.stringify(get().carts));
  },

  removeCart: async (id: string) => {
    set((state) => ({
      carts: state.carts.filter((item) => item.id !== id),
    }));

    await AsyncStorage.setItem(STORAGE_KEY.CART, JSON.stringify(get().carts));
  },
}));

export default useCartStore;
