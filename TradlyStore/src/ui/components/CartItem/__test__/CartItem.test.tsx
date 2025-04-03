import { render, screen, fireEvent } from '@testing-library/react-native';

// Components
import { CartItem } from '..';

describe('CartItem', () => {
  const mockOnRemoveItem = jest.fn();
  const mockOnUpdateQuantityItem = jest.fn();

  const defaultPropsWithoutAction = {
    id: '1',
    image: 'https://example.com/image.jpg',
    name: 'Test Product',
    quantity: 2,
    price: 100,
    discount: 10,
  };

  const defaultProps = {
    ...defaultPropsWithoutAction,
    onRemoveItem: mockOnRemoveItem,
    onUpdateQuantityItem: mockOnUpdateQuantityItem,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should renders CartItem correctly', () => {
    render(<CartItem {...defaultProps} />);

    expect(screen.getByText('Test Product')).toBeTruthy();
    expect(screen.getByText('$90')).toBeTruthy();
    expect(screen.getByText('$100')).toBeTruthy();
    expect(screen.getByText('10% off')).toBeTruthy();
    expect(screen.getByText('Remove')).toBeTruthy();
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('Should renders CartItem correctly without actions', () => {
    render(<CartItem {...defaultPropsWithoutAction} />);

    expect(screen.getByText('Test Product')).toBeTruthy();
    expect(screen.getByText('$90')).toBeTruthy();
    expect(screen.getByText('$100')).toBeTruthy();
    expect(screen.getByText('10% off')).toBeTruthy();
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('Should calls onRemoveItem when "Remove" button is pressed', () => {
    render(<CartItem {...defaultProps} />);

    fireEvent.press(screen.getByText('Remove'));

    expect(mockOnRemoveItem).toHaveBeenCalledTimes(1);
    expect(mockOnRemoveItem).toHaveBeenCalledWith('1');
  });

  it('Should does not display discount if there is no discount', () => {
    render(<CartItem {...defaultProps} discount={undefined} />);

    expect(screen.getByText('$100')).toBeTruthy();
    expect(screen.queryByText('10% off')).toBeFalsy();
  });
});
