import * as v from 'valibot';
import { validateRequired, validateRequiredArray } from './validate';

export const productSchema = v.object({
  title: validateRequired,
  slideImages: validateRequiredArray,
  category: validateRequired,
  price: validateRequired,
  discount: validateRequired,
  quantity: validateRequired,
  location: validateRequired,
  priceType: validateRequired,
  description: validateRequired,
  additionalDetails: validateRequiredArray,
});
