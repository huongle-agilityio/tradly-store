/**
 * Checks if the given object is empty or contains only empty string values.
 *
 * @param value - The object to check, which can also be null.
 * @returns True if the object is null or all its values are empty strings, otherwise false.
 */
export const isEmptyObject = (value: object | null): boolean =>
  value ? Object.values(value).every((value) => value === '') : true;
