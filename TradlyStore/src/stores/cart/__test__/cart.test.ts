import { act } from '@testing-library/react-native';

import { useCartStore, INITIAL_CART } from '..';

// Interfaces
import { Cart } from '@/interfaces';
import { CART_lIST } from '@/mocks';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

describe('useCartStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useCartStore.setState(INITIAL_CART);
  });

  it('Should set carts correctly', () => {
    act(() => {
      useCartStore.getState().setCarts(CART_lIST);
    });

    expect(useCartStore.getState().carts).toEqual(CART_lIST);
  });

  it('Should add a new cart item if it does not exist', async () => {
    const newCart: Cart = {
      ...CART_lIST[0],
      id: '3',
    };

    await act(async () => {
      await useCartStore.getState().addNewCart(newCart);
    });

    expect(useCartStore.getState().carts).toEqual([newCart]);
  });

  it('Should update quantity if cart item already exists', async () => {
    const existingCart: Cart = {
      ...CART_lIST[0],
      id: '1',
    };

    act(() => {
      useCartStore.getState().setCarts([existingCart]);
    });

    const newCart: Cart = { ...CART_lIST[0], id: '1' };

    await act(async () => {
      await useCartStore.getState().addNewCart(newCart);
    });

    expect(useCartStore.getState().carts).toEqual([
      { ...CART_lIST[0], quantity: 4 },
    ]);
  });

  it('Should update quantity of an existing cart item', async () => {
    act(() => {
      useCartStore.getState().setCarts([CART_lIST[0]]);
    });

    await act(async () => {
      await useCartStore.getState().updateQuantityItem('1', 5);
    });

    expect(useCartStore.getState().carts).toEqual([
      { ...CART_lIST[0], quantity: 5 },
    ]);
  });

  it('Should update quantity of an existing cart item2222', async () => {
    act(() => {
      useCartStore.getState().setCarts(CART_lIST);
    });

    await act(async () => {
      await useCartStore.getState().updateQuantityItem('3', 5);
    });

    expect(useCartStore.getState().carts).toEqual(CART_lIST);
  });

  it('Should remove a cart item', async () => {
    act(() => {
      useCartStore.getState().setCarts([CART_lIST[0]]);
    });

    await act(async () => {
      await useCartStore.getState().removeCart('1');
    });

    expect(useCartStore.getState().carts).toEqual([]);
  });

  it('Should clear the cart', () => {
    act(() => {
      useCartStore.getState().setCarts(CART_lIST);
    });

    act(() => {
      useCartStore.getState().clearCart();
    });

    expect(useCartStore.getState().carts).toEqual([]);
  });
});
