import { render, fireEvent, screen } from '@testing-library/react-native';

// Components
import { ImageUpload } from '..';

// Mocks
import { IMAGES } from '@/mocks';

describe('ImageUpload Component', () => {
  const mockOnPress = jest.fn();

  it('renders correctly with given image', () => {
    render(<ImageUpload image={IMAGES} onPress={mockOnPress} />);

    const image = screen.getByTestId('uploaded-image');
    expect(image).toBeTruthy();
    expect(image.props.source.uri).toBe(IMAGES);
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('calls onPress when close button is pressed', () => {
    render(<ImageUpload image={IMAGES} onPress={mockOnPress} />);

    const closeButton = screen.getByTestId('close-button');
    fireEvent.press(closeButton);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
