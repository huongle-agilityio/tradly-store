// Interfaces
import { ToastColor } from '@/interfaces';

export interface Toast {
  title?: string;
  description: string;
  variant?: ToastColor;
  duration?: number;
}

export interface ToastState {
  toast: Toast | null;
}

export interface ToastStore extends ToastState {
  showToast: (toast: Toast) => void;
  closeToast: () => void;
}
