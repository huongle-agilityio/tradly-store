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
  /**
   * Displays a toast notification with the provided toast details.
   * Updates the toast state with the given toast object.
   *
   * @param {Toast} toast - The toast object containing details such as title, description, variant, and duration.
   */
  showToast: (toast: Toast) => {
    set({ toast });
  },
  /**
   * Closes the toast notification by setting the toast state to null.
   */
  closeToast: () => {
    set({ toast: null });
  },
}));

export default useToast;
