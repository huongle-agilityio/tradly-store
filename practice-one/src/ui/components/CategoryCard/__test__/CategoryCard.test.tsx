import { render, screen } from '@testing-library/react-native';

// Components
import { CategoryCard } from '..';

describe('CategoryCard Component', () => {
  const mockTitle = 'Test Category';
  const mockSource = 'https://example.com/image.jpg';

  it('should render correctly', () => {
    render(<CategoryCard title={mockTitle} source={mockSource} />);

    expect(screen.getByText(mockTitle)).toBeTruthy();
    expect(screen.getByTestId('category-card-image')).toBeTruthy();
  });
});
