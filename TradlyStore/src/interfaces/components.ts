// Button
export type ButtonSize = 'none' | 'small' | 'medium' | 'full';
export type ButtonVariant = 'solid' | 'bordered' | 'ghost';
export type ButtonTextSize = 'xs' | 'base' | 'md' | 'lg' | 'xl';
export type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'dark';

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
  | 'link'
  | 'fade'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'placeholder'
  | 'error'
  | 'success';
export type TextWeight = 'light' | 'normal' | 'medium' | 'bold';

// Input
export type InputVariant = 'default' | 'outlined' | 'underlined';

// Toast
export type ToastColor = 'default' | 'success' | 'error';

// Select
export interface Option {
  value: string;
  label: string;
}

export interface ListDetails {
  value: string;
  title: string;
}
