import { render, fireEvent, screen } from '@testing-library/react-native';

// Components
import { ProductCarousel } from '..';

describe('ProductCarousel', () => {
  const mockImages = ['image1.jpg', 'image2.jpg', 'image3.jpg'];

  it('Should renders correct number of images', () => {
    render(<ProductCarousel images={mockImages} />);

    expect(screen.getAllByTestId('product-carousel-image')).toHaveLength(
      mockImages.length,
    );
  });

  it('Should renders correct number of dots', () => {
    render(<ProductCarousel images={mockImages} />);

    expect(screen.getAllByTestId('product-carousel-dot-item')).toHaveLength(
      mockImages.length,
    );
  });

  it('Should triggers onScroll event when scrolling', () => {
    render(<ProductCarousel images={mockImages} />);

    const scrollView = screen.getByTestId('product-carousel-scroll');

    fireEvent.scroll(scrollView, {
      nativeEvent: { contentOffset: { x: 200 } },
    });

    expect(scrollView.props.onScroll).toBeDefined();
  });
});
