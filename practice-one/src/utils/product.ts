import { Animated } from 'react-native';

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

/**
 * Interpolates a value based on the scroll position, providing a smooth transition effect.
 *
 * @param scrollX - The animated value representing the horizontal scroll position.
 * @param index - The index of the current element in the scroll view.
 * @param width - The width of each element in the scroll view.
 * @param outputRange - The range of values to interpolate between, which can be numbers or strings.
 * @returns The interpolated value, clamped to the range specified.
 */
export const interpolateValue = (
  scrollX: Animated.Value,
  index: number,
  width: number,
  outputRange: number[] | string[],
) => {
  return scrollX.interpolate({
    inputRange: [width * (index - 1), width * index, width * (index + 1)],
    outputRange,
    extrapolate: 'clamp',
  });
};
