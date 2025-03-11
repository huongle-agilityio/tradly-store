export const SCREEN_NAME = {
  HOME: 'home',
  BROWSE: 'browse',
  PRODUCT: 'product',
  PRODUCT_DETAIL: 'products/[id]/index',
  ORDER_HISTORY: 'order-history',
  ORDER_SUCCESS: 'order/OrderSuccess',
  PROFILE: 'profile',
  CART: 'cart/index',
  ADDRESS: 'address/index',
} as const;

export const SCREEN_ROUTES = {
  LOGIN: '/login',
  BROWSE: '/browse',
  CART: '/cart',
  ONBOARDING: '/onboarding',
  CATEGORIES: '/categories',
  HOME: '/home',
  PRODUCT: '/products',
  PRODUCT_DETAIL: (id: string) => `/products/${id}` as const,
  ADDRESS: '/address',
  ORDER_SUCCESS: '/order/OrderSuccess',
} as const;
