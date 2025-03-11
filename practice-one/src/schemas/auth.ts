import * as v from 'valibot';
import { validateEmail, validateRequired } from './validate';

export const loginSchema = v.object({
  email: validateEmail,
  password: validateRequired,
});
