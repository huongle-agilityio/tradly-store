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
      /**
       * Adds a new cart to the list of carts, or updates the quantity
       * of an existing cart if a cart with the same ID already exists.
       *
       * @param {Cart} cart The cart to add or update.
       *
       * @returns The updated list of carts.
       */
      addNewCart: async (cart: Cart) => {
        set((state) => {
          // Check if a cart with the same ID already exists
          const existingCartIndex = state.carts.findIndex(
            (item) => item.id === cart.id,
          );
          let updatedCarts;

          if (existingCartIndex !== -1) {
            updatedCarts = [...state.carts];

            // Update the quantity of the existing cart
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

      /**
       * Updates the quantity of an existing cart in the list of carts.
       *
       * @param {string} id The ID of the cart to update.
       * @param {number} quantity The new quantity of the cart.
       *
       * @returns The updated list of carts.
       */
      updateQuantityItem: async (id: string, quantity: number) => {
        set((state) => ({
          carts: state.carts.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          ),
        }));
      },

      /**
       * Removes a cart from the list of carts.
       *
       * @param {string} id The ID of the cart to remove.
       *
       * @returns The updated list of carts.
       */
      removeCart: async (id: string) => {
        set((state) => ({
          carts: state.carts.filter((item) => item.id !== id),
        }));
      },
      clearCart: () => set({ ...INITIAL_CART }),
    }),
    {
      name: STORAGE_KEY.CART,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
  shallow,
);
