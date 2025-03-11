import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { createJSONStorage, persist } from 'zustand/middleware';
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

export const useCartStore = createWithEqualityFn<CartStore>()(
  persist(
    (set) => ({
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
              quantity:
                updatedCarts[existingCartIndex].quantity + cart.quantity,
            };
          } else {
            updatedCarts = [cart, ...state.carts];
          }

          return { carts: updatedCarts };
        });
      },

      updateQuantityItem: async (id: string, quantity: number) => {
        set((state) => ({
          carts: state.carts.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          ),
        }));
      },

      removeCart: async (id: string) => {
        set((state) => ({
          carts: state.carts.filter((item) => item.id !== id),
        }));
      },
    }),
    {
      name: STORAGE_KEY.CART,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
  shallow,
);

export default useCartStore;
