import AsyncStorage from '@react-native-async-storage/async-storage';
import { act, renderHook } from '@testing-library/react-native';
import { useAddressForm } from '../useAddressForm';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('useAddressForm', () => {
  const initForm = {
    username: '',
    streetAddress: '',
    phone: '',
    city: '',
    state: '',
    zipCode: '',
  };

  const formWithData = {
    username: 'John Doe',
    streetAddress: '123 Main St',
    phone: '1234567890',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useAddressForm());
    expect(result.current.form).toEqual(initForm);
  });

  it('should update form state correctly', () => {
    const { result } = renderHook(() => useAddressForm());

    act(() => {
      result.current.setForm(formWithData);
    });

    expect(result.current.form).toEqual(formWithData);
  });

  it('should clear form state', () => {
    const { result } = renderHook(() => useAddressForm());

    act(() => {
      result.current.setForm(formWithData);
    });

    expect(result.current.form).toEqual(formWithData);

    act(() => {
      result.current.clearForm();
    });

    expect(result.current.form).toEqual(initForm);
  });

  it('should persist state in AsyncStorage', async () => {
    const { result } = renderHook(() => useAddressForm());

    act(() => {
      result.current.setForm(formWithData);
    });

    expect(AsyncStorage.setItem).toHaveBeenCalled();
  });
});
