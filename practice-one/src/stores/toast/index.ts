import { create } from 'zustand';

// Constants
import { TIMING } from '@/constants';

// Models
import { Toast, ToastState, ToastStore } from './type';

const INITIAL_TOAST_STATE: ToastState = {
  toast: {
    title: '',
    description: '',
    variant: 'default',
    duration: TIMING.TOAST_DURATION,
  },
};

export const useToast = create<ToastStore>()((set) => ({
  ...INITIAL_TOAST_STATE,
  showToast: (toast: Toast) => {
    set({ toast });
  },
  closeToast: () => {
    set({ toast: null });
  },
}));

export default useToast;
