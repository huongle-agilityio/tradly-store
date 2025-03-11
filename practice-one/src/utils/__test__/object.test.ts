import { isEmptyObject } from '..';

describe('isEmptyObject', () => {
  it('Should return true with null value', () => {
    expect(isEmptyObject(null)).toBe(true);
  });

  it('Should return true with an empty object', () => {
    expect(isEmptyObject({})).toBe(true);
  });

  it('Should return false with an object with properties', () => {
    expect(isEmptyObject({ key: 'value' })).toBe(false);
  });

  it('Should return false with an object with multiple properties', () => {
    expect(isEmptyObject({ key1: 'value1', key2: 'value2' })).toBe(false);
  });
});
