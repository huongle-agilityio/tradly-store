import { render, screen, fireEvent } from '@testing-library/react-native';

// Components
import { CartItem } from '..';

// Mocks
import { CART_QUANTITY } from '@/mocks';

const mockOnRemoveItem = jest.fn();
const mockOnUpdateQuantityItem = jest.fn();

const defaultProps = {
  id: '1',
  image: 'https://example.com/image.jpg',
  name: 'Test Product',
  quantity: 2,
  price: 100,
  discount: 10,
  onRemoveItem: mockOnRemoveItem,
  onUpdateQuantityItem: mockOnUpdateQuantityItem,
};

describe('CartItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should renders CartItem correctly', () => {
    const { toJSON } = render(<CartItem {...defaultProps} />);

    expect(screen.getByText('Test Product')).toBeTruthy();
    expect(screen.getByText('$90')).toBeTruthy();
    expect(screen.getByText('$100')).toBeTruthy();
    expect(screen.getByText('10% off')).toBeTruthy();
    expect(screen.getByText('Remove')).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('Should calls onRemoveItem when "Remove" button is pressed', () => {
    render(<CartItem {...defaultProps} />);

    fireEvent.press(screen.getByText('Remove'));

    expect(mockOnRemoveItem).toHaveBeenCalledTimes(1);
    expect(mockOnRemoveItem).toHaveBeenCalledWith('1');
  });

  it('Should calls onUpdateQuantityItem when quantity is changed', () => {
    render(<CartItem {...defaultProps} />);

    fireEvent.press(screen.getByTestId('quantity-select'));
    fireEvent.press(screen.getByText(CART_QUANTITY[1].label));

    expect(mockOnUpdateQuantityItem).toHaveBeenCalledTimes(1);
    expect(mockOnUpdateQuantityItem).toHaveBeenCalledWith('1', '2');
  });

  it('Should does not display discount if there is no discount', () => {
    render(<CartItem {...defaultProps} discount={undefined} />);

    expect(screen.getByText('$100')).toBeTruthy();
    expect(screen.queryByText('10% off')).toBeFalsy();
  });
});
