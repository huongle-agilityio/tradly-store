import {
  render,
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/react-native';

// Components
import { ProductCarousel } from '..';

describe('ProductCarousel', () => {
  const mockImages = ['image1.jpg', 'image2.jpg', 'image3.jpg'];

  it('Should renders correct number of images', () => {
    const { toJSON } = render(
      <ProductCarousel name="Test Product" images={mockImages} />,
    );

    expect(screen.getAllByTestId('product-carousel-image')).toHaveLength(
      mockImages.length,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('Should renders correct number of dots', () => {
    render(<ProductCarousel name="Test Product" images={mockImages} />);

    expect(screen.getAllByTestId('product-carousel-dot-item')).toHaveLength(
      mockImages.length,
    );
  });

  it('Should update container width on layout change', async () => {
    render(<ProductCarousel name="Test Product" images={mockImages} />);

    const container = screen.getByTestId('product-carousel-container');

    fireEvent(container, 'layout', { nativeEvent: { layout: { width: 300 } } });

    await waitFor(() => {
      const images = screen.getAllByTestId('product-carousel-image');
      images.forEach((image) => {
        expect(image.props.style.width).toBe(300);
      });
    });
  });

  it('Should triggers onScroll event when scrolling', () => {
    render(<ProductCarousel name="Test Product" images={mockImages} />);

    const scrollView = screen.getByTestId('product-carousel-scroll');

    fireEvent.scroll(scrollView, {
      nativeEvent: { contentOffset: { x: 200 } },
    });

    expect(scrollView.props.onScroll).toBeDefined();
  });
});
