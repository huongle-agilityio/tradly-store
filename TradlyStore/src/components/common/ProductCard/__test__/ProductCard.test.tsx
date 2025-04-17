import { render, fireEvent, screen } from '@testing-library/react-native';

// Components
import { ProductCard } from '..';

describe('ProductCard Component', () => {
  const mockProps = {
    source: 'image-url',
    title: 'Product Title',
    storeName: 'Store Name',
    storeSource: 'store-logo-url',
    price: 100,
    onPress: jest.fn(),
  };

  it('Should renders correctly with required props', () => {
    const { toJSON } = render(<ProductCard {...mockProps} discount={20} />);

    expect(screen.getByTestId('category-card-image')).toBeTruthy();
    expect(screen.getByText(mockProps.title)).toBeTruthy();
    expect(screen.getByText(mockProps.storeName)).toBeTruthy();
    expect(screen.getByText('$80')).toBeTruthy();
    expect(screen.getByText('$100')).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('Should calls onPress when clicked', () => {
    render(<ProductCard {...mockProps} />);
    fireEvent.press(screen.getByTestId('product-card'));

    expect(mockProps.onPress).toHaveBeenCalled();
  });

  it('Should hides original price if no discount is applied', () => {
    render(<ProductCard {...mockProps} />);

    expect(screen.getByText('$100')).toBeTruthy();
  });
});
