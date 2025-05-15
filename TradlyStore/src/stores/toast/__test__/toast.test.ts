import { act } from '@testing-library/react-native';

import { useToast } from '..';

// Constants
import { TIMING } from '@/constants';

describe('useToast', () => {
  const fixedTimestamp = '1554632430000';
  const toast = {
    title: '',
    description: '',
    variant: 'default',
    fixedTimestamp,
    duration: TIMING.TOAST_DURATION,
  } as const;

  const RealDate = Date.now;

  beforeEach(() => {
    useToast.setState({
      toast,
    });
  });

  beforeAll(() => {
    global.Date.now = jest.fn(() => new Date('2019-04-07T10:20:30Z').getTime());
  });

  afterAll(() => {
    global.Date.now = RealDate;
  });

  it('Should initialize with default state', () => {
    const state = useToast.getState();
    expect(state.toast).toEqual(toast);
  });

  it('Should update toast state when showToast is called', () => {
    const mockToast = {
      title: 'Success',
      description: 'Item added to cart',
      duration: 3000,
      variant: 'success' as const,
    };

    const expectedToast = {
      ...mockToast,
      timestamp: fixedTimestamp,
    };

    useToast.getState().showToast(mockToast);

    expect(useToast.getState().toast).toEqual(expectedToast);
  });

  it('Should reset toast state when closeToast is called', () => {
    act(() => {
      useToast.getState().closeToast();
    });

    expect(useToast.getState().toast).toBeNull();
  });
});
