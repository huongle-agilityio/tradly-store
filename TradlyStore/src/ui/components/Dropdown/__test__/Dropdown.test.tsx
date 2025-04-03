import { render, fireEvent, screen } from '@testing-library/react-native';

// Components
import { Dropdown } from '..';

// Mocks
import { CART_QUANTITY } from '@/mocks';

describe('Dropdown Component', () => {
  it('Should shows error message when error prop is provided', () => {
    render(
      <Dropdown
        value=""
        data={CART_QUANTITY}
        error="This field is required"
        onChange={jest.fn()}
      />,
    );

    expect(screen.getByText('This field is required')).toBeTruthy();
  });

  it('Should not open options when disabled', () => {
    render(
      <Dropdown value="" data={CART_QUANTITY} disabled onChange={jest.fn()} />,
    );

    fireEvent.press(screen.getByTestId('dropdown'));

    expect(screen.queryByText(CART_QUANTITY[0].value)).toBeNull();
  });
});
