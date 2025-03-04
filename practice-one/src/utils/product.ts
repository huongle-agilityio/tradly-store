/**
 * Calculates the discounted price based on the original price and discount percentage.
 *
 * @param originalPrice - The original price of the product.
 * @param discount - The discount percentage to apply. If not provided, the original price is returned.
 * @returns The discounted price rounded to two decimal places, or the original price if no discount is provided.
 *          Returns '--' if the original price is negative, or if the discount is negative or greater than 100.
 */
export const calculateDiscountedPrice = (
  originalPrice: number,
  discount?: number,
): number | string => {
  if (!discount) {
    return originalPrice;
  }

  if (originalPrice < 0 || discount < 0 || discount > 100) {
    return '--';
  }

  const discountedPrice = originalPrice - (originalPrice * discount) / 100;
  return Math.round(discountedPrice * 100) / 100;
};
