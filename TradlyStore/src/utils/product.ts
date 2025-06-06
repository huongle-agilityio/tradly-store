import { Animated } from 'react-native';

// Interfaces
import { Cart, ListDetails } from '@/interfaces';

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

/**
 * Returns an array of ListDetails objects containing the product details.
 *
 * @param {{ priceType: string, category: string, location: string }} - An object containing the product details.
 * @returns An array of ListDetails objects containing the product details.
 */
export const getProductDetails = ({
  priceType,
  category,
  location,
}: {
  priceType: string;
  category: string;
  location: string;
}): ListDetails[] => [
  {
    title: 'Condition',
    value: 'Organic',
  },
  {
    title: 'Price Type',
    value: priceType,
  },
  {
    title: 'Category',
    value: category,
  },
  {
    title: 'Location',
    value: location,
  },
];

/**
 * Returns an array of ListDetails objects containing the price details.
 *
 * @param {{ total: number, totalQuantity: number }} - An object containing the total price and total quantity.
 * @returns An array of ListDetails objects containing the price details.
 */
export const getPriceDetails = ({
  total,
  totalQuantity,
}: {
  total: number;
  totalQuantity: number;
}): ListDetails[] => [
  {
    title: `Price ${totalQuantity}`,
    value: total.toString(),
  },
  {
    title: 'Delivery Fee',
    value: 'Info',
  },
];

/**
 * Calculates the total price and total quantity of the items in the cart.
 *
 * @param {{ price: number, discount?: number, quantity: number }[]} carts - An array of Cart objects containing the items in the cart.
 * @returns An object with two properties: total and totalQuantity, containing the total price and total quantity of the items in the cart.
 */
export const getTotalCarts = (
  carts: Cart[],
): { total: number; totalQuantity: number } => {
  const total = carts.reduce(
    (sum, item) =>
      sum +
      Number(calculateDiscountedPrice(item.price, item.discount)) *
        item.quantity,
    0,
  );

  const totalQuantity = carts.reduce((sum, item) => sum + item.quantity, 0);

  return { total, totalQuantity };
};
