export const SCREEN_NAME = {
  HOME: 'home',
  BROWSE: 'browse',
  PRODUCT: 'product',
  ORDER_HISTORY: 'order-history',
  PROFILE: 'profile',
} as const;

export const SCREEN_ROUTES = {
  LOGIN: '/login',
  BROWSE: '/browse',
  ONBOARDING: '/onboarding',
  CATEGORIES: '/categories',
  HOME: '/home',
  PRODUCT: '/products',
  PRODUCT_DETAIL: (id: string) => `/products/${id}` as const,
} as const;
