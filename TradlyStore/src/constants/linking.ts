export const LINKING_URL = {
  BASE: 'tradly://',
  BASE_HTTP: 'http://www.tradly.com',
  BASE_HTTPS: 'https://www.tradly.com',

  HOME: 'tradly://home',
  BROWSE: 'tradly://browse',
  PRODUCT_DETAIL: (id: string) => `tradly://productDetail/${id}`,
};
