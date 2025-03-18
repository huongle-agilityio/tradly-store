import { fireEvent, render, screen } from '@testing-library/react-native';

// Components
import { CategoryCard } from '..';

describe('CategoryCard Component', () => {
  const mockTitle = 'Test Category';
  const mockSource = 'https://example.com/image.jpg';

  const props = {
    value: mockTitle,
    onPress: jest.fn(),
    title: mockTitle,
    source: mockSource,
    style: { width: 100, height: 100 },
  };

  it('Should render correctly', () => {
    render(<CategoryCard {...props} />);

    expect(screen.getByText(mockTitle)).toBeTruthy();
    expect(screen.getByTestId('category-card-image')).toBeTruthy();
  });

  it('Should call function onPress', () => {
    render(<CategoryCard {...props} />);

    const card = screen.getByTestId('category-card');
    fireEvent.press(card);

    expect(props.onPress).toHaveBeenCalled();
  });
});
