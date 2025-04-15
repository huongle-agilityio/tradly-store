import { act } from '@testing-library/react-native';

import { useToast } from '..';

// Constants
import { TIMING } from '@/constants';

// Models
import { Toast } from '../type';

describe('useToast', () => {
  const toast = {
    title: '',
    description: '',
    variant: 'default',
    duration: TIMING.TOAST_DURATION,
  } as const;

  beforeEach(() => {
    useToast.setState({
      toast,
    });
  });

  it('Should initialize with default state', () => {
    const state = useToast.getState();
    expect(state.toast).toEqual(toast);
  });

  it('Should update toast state when showToast is called', () => {
    const mockToast: Toast = {
      title: 'Success',
      description: 'Item added to cart',
      variant: 'success',
      duration: 3000,
    };

    act(() => {
      useToast.getState().showToast(mockToast);
    });

    expect(useToast.getState().toast).toEqual(mockToast);
  });

  it('Should reset toast state when closeToast is called', () => {
    act(() => {
      useToast.getState().closeToast();
    });

    expect(useToast.getState().toast).toBeNull();
  });
});
