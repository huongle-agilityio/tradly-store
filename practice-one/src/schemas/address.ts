import * as v from 'valibot';
import {
  validateName,
  validatePhone,
  validateRequired,
  validateZipCode,
} from './validate';

export const addressSchema = v.object({
  username: validateName,
  phone: validatePhone,
  streetAddress: validateRequired,
  city: validateRequired,
  state: validateRequired,
  zipCode: validateZipCode,
});
