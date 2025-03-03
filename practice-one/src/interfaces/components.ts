// Button
export type ButtonSize = 'none' | 'small' | 'medium' | 'full';
export type ButtonVariant = 'solid' | 'bordered' | 'ghost';
export type ButtonTextSize = 'xs' | 'base' | 'md' | 'lg' | 'xl';
export type ButtonColor = 'primary' | 'secondary' | 'success' | 'error';

// Text
export type TextSize =
  | 'xxs'
  | 'xs'
  | 'sm'
  | 'base'
  | 'md'
  | 'lg'
  | 'xl'
  | 'xxl'
  | 'xxxl';
export type TextColor =
  | 'default'
  | 'light'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'placeholder'
  | 'error'
  | 'success';
export type TextWeight = 'light' | 'normal' | 'medium' | 'bold';

// Input
export type InputVariant = 'default' | 'outlined' | 'underlined';

// Select
export interface Option {
  value: string;
  label: string;
}
