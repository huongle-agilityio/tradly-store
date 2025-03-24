import {render, fireEvent, screen} from '@testing-library/react-native';
import {Text} from 'react-native';

//  Components
import {Button} from '..';

describe('Button Component', () => {
  it('Should Should renders correctly with children', () => {
    const container = render(<Button>Click me</Button>).toJSON();

    expect(screen.getByText('Click me')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('Should Should renders correctly when variant is not solid', () => {
    const container = render(
      <Button variant="bordered">Click me</Button>,
    ).toJSON();

    expect(screen.getByText('Click me')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('Should Should renders correctly when variant is solid and color is secondary', () => {
    const container = render(
      <Button color="secondary">Click me</Button>,
    ).toJSON();

    expect(screen.getByText('Click me')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('Should Should renders correctly when variant is not solid and color is secondary', () => {
    const container = render(
      <Button color="secondary" variant="bordered">
        Click me
      </Button>,
    ).toJSON();

    expect(screen.getByText('Click me')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('Should calls onPress when pressed', () => {
    const mockOnPress = jest.fn();
    render(<Button onPress={mockOnPress}>Click</Button>);

    fireEvent.press(screen.getByTestId('button'));

    expect(mockOnPress).toHaveBeenCalled();
  });

  it('Should does not call onPress when disabled', () => {
    const mockOnPress = jest.fn();
    render(
      <Button onPress={mockOnPress} disabled>
        Click
      </Button>,
    );

    fireEvent.press(screen.getByTestId('button'));

    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('Should does not call onPress when loading', () => {
    const mockOnPress = jest.fn();
    render(
      <Button onPress={mockOnPress} isLoading>
        Click
      </Button>,
    );

    fireEvent.press(screen.getByTestId('button'));
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('Should displays Loading text when isLoading is true', () => {
    render(<Button isLoading>Click</Button>);

    expect(screen.getByTestId('button-loading')).toBeTruthy();
  });

  it('Should renders icon if provided', () => {
    render(<Button icon={<Text testID="icon">Icon</Text>}>Click</Button>);

    expect(screen.getByTestId('icon')).toBeTruthy();
  });
});
