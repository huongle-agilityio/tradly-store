import { render, screen, fireEvent } from '@testing-library/react-native';

// Components
import { ImageUpload } from '..';

describe('ImageUpload Component', () => {
  const mockOnPress = jest.fn();
  const IMAGES = 'https://path-to-image.jpg';

  const props = {
    id: 0,
    image: IMAGES,
    onPress: mockOnPress,
    isActive: false,
  };

  it('renders correctly with given image', () => {
    render(<ImageUpload {...props} isActive={true} />);

    const image = screen.getByTestId('uploaded-image');

    expect(image).toBeTruthy();
    expect(image.props.source.uri).toBe(IMAGES);
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('calls onPress when close button is pressed', () => {
    render(<ImageUpload {...props} />);

    const closeButton = screen.getByTestId('close-button');
    fireEvent.press(closeButton);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
    expect(mockOnPress).toHaveBeenCalledWith(props.id);
  });
});
