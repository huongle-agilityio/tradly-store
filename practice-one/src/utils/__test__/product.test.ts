import { Animated } from 'react-native';
import {
  calculateDiscountedPrice,
  getPriceDetails,
  getProductDetails,
  getTotalCarts,
  interpolateValue,
} from '..';

describe('calculateDiscountedPrice', () => {
  it('Should returns the original price when no discount is provided', () => {
    expect(calculateDiscountedPrice(100)).toBe(100);
  });

  it('Should calculates the discounted price correctly', () => {
    expect(calculateDiscountedPrice(200, 10)).toBe(180);
    expect(calculateDiscountedPrice(150, 25)).toBe(112.5);
    expect(calculateDiscountedPrice(99.99, 5)).toBe(94.99);
  });

  it('Should rounds the result to two decimal places', () => {
    expect(calculateDiscountedPrice(199.99, 15)).toBe(169.99);
    expect(calculateDiscountedPrice(499.99, 20)).toBe(399.99);
  });

  it('Should returns "--" for invalid inputs (negative price or invalid discount)', () => {
    expect(calculateDiscountedPrice(-100, 10)).toBe('--');
    expect(calculateDiscountedPrice(100, -5)).toBe('--');
    expect(calculateDiscountedPrice(100, 110)).toBe('--');
  });
});

describe('interpolateValue', () => {
  it('Should call interpolate with correct inputRange and outputRange', () => {
    const scrollX = new Animated.Value(0);
    const index = 1;
    const width = 100;
    const outputRange = [0.5, 1, 0.5];

    const interpolateSpy = jest.spyOn(scrollX, 'interpolate');

    interpolateValue(scrollX, index, width, outputRange);

    expect(interpolateSpy).toHaveBeenCalledWith({
      inputRange: [width * (index - 1), width * index, width * (index + 1)],
      outputRange,
      extrapolate: 'clamp',
    });
  });
});

describe('getProductDetails', () => {
  it('should return correct product details', () => {
    const product = {
      priceType: 'Fixed',
      category: 'Electronics',
      location: 'New York',
    };

    const result = getProductDetails(product);

    expect(result).toEqual([
      { title: 'Condition', value: 'Organic' },
      { title: 'Price Type', value: 'Fixed' },
      { title: 'Category', value: 'Electronics' },
      { title: 'Location', value: 'New York' },
    ]);
  });

  it('should handle empty values correctly', () => {
    const product = {
      priceType: '',
      category: '',
      location: '',
    };

    const result = getProductDetails(product);

    expect(result).toEqual([
      { title: 'Condition', value: 'Organic' },
      { title: 'Price Type', value: '' },
      { title: 'Category', value: '' },
      { title: 'Location', value: '' },
    ]);
  });

  it('should handle undefined values correctly', () => {
    const product = {
      priceType: undefined as any,
      category: undefined as any,
      location: undefined as any,
    };

    const result = getProductDetails(product);

    expect(result).toEqual([
      { title: 'Condition', value: 'Organic' },
      { title: 'Price Type', value: undefined },
      { title: 'Category', value: undefined },
      { title: 'Location', value: undefined },
    ]);
  });
});

describe('getTotalCarts', () => {
  it('should return correct total price and total quantity', () => {
    const carts = [
      { price: 100, discount: 10, quantity: 2 },
      { price: 200, discount: 20, quantity: 1 },
    ];

    const result = getTotalCarts(carts as any);

    expect(result).toEqual({ total: 340, totalQuantity: 3 });
  });

  it('should return 0 total and quantity for empty carts', () => {
    const result = getTotalCarts([]);
    expect(result).toEqual({ total: 0, totalQuantity: 0 });
  });

  it('should handle carts with 0 quantity correctly', () => {
    const carts = [
      { price: 100, discount: 10, quantity: 0 },
      { price: 200, discount: 20, quantity: 0 },
    ];

    const result = getTotalCarts(carts as any);

    expect(result).toEqual({ total: 0, totalQuantity: 0 });
  });
});

describe('getPriceDetails', () => {
  it('should return formatted price details', () => {
    const total = 200;
    const totalQuantity = 5;

    const result = getPriceDetails({ total, totalQuantity });

    expect(result).toEqual([
      { title: 'Price 5', value: '200' },
      { title: 'Delivery Fee', value: 'Info' },
    ]);
  });

  it('should handle zero total and quantity correctly', () => {
    const total = 0;
    const totalQuantity = 0;

    const result = getPriceDetails({ total, totalQuantity });

    expect(result).toEqual([
      { title: 'Price 0', value: '0' },
      { title: 'Delivery Fee', value: 'Info' },
    ]);
  });
});
