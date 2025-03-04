import { calculateDiscountedPrice } from '..';

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
