import { render, fireEvent, screen } from '@testing-library/react-native';

// Components
import { Select } from '..';

// Mocks
import { CART_QUANTITY } from '@/mocks';

describe('Select Component', () => {
  it('Should renders correctly with placeholder', () => {
    const { toJSON } = render(
      <Select
        value=""
        options={CART_QUANTITY}
        placeholder="Select an option"
        onValueChange={jest.fn()}
      />,
    );

    expect(screen.getByPlaceholderText('Select an option')).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('Should opens options when clicking the input', () => {
    render(
      <Select value="" options={CART_QUANTITY} onValueChange={jest.fn()} />,
    );

    const input = screen.getByTestId('select-box');
    fireEvent.press(input);

    expect(screen.getByText(CART_QUANTITY[0].value)).toBeTruthy();
    expect(screen.getByText(CART_QUANTITY[1].value)).toBeTruthy();
  });

  it('Should closes dropdown when selecting an option', () => {
    const onValueChange = jest.fn();
    render(
      <Select value="" options={CART_QUANTITY} onValueChange={onValueChange} />,
    );

    fireEvent.press(screen.getByTestId('select-box'));
    fireEvent.press(screen.getByText(CART_QUANTITY[0].value));

    expect(onValueChange).toHaveBeenCalledWith(CART_QUANTITY[0].value);
    expect(screen.queryByText(CART_QUANTITY[0].value)).toBeNull();
  });

  it('Should shows error message when error prop is provided', () => {
    render(
      <Select
        value=""
        options={CART_QUANTITY}
        error="This field is required"
        onValueChange={jest.fn()}
      />,
    );

    expect(screen.getByText('This field is required')).toBeTruthy();
  });

  it('Should not open options when disabled', () => {
    render(
      <Select
        value=""
        options={CART_QUANTITY}
        disabled
        onValueChange={jest.fn()}
      />,
    );

    fireEvent.press(screen.getByTestId('select-box'));

    expect(screen.queryByText(CART_QUANTITY[0].value)).toBeNull();
  });

  it('Should not open options when isLoading is true', () => {
    render(
      <Select
        value=""
        options={CART_QUANTITY}
        isLoading
        onValueChange={jest.fn()}
      />,
    );

    fireEvent.press(screen.getByTestId('select-box'));

    expect(screen.queryByText(CART_QUANTITY[0].value)).toBeNull();
  });
});
