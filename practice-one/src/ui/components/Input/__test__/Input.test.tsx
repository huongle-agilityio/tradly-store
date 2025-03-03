import { Text } from 'react-native';
import { render, screen, fireEvent } from '@testing-library/react-native';

// Components
import { Input } from '..';

describe('Input Component', () => {
  it('Should match snapshot', () => {
    const { toJSON } = render(
      <Input value="Test" placeholder="Enter text" onChangeText={jest.fn()} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('Should render label if provided', () => {
    render(
      <Input
        label="Username"
        value=""
        placeholder="Enter text"
        onChangeText={jest.fn()}
      />,
    );

    expect(screen.getByText('Username')).toBeTruthy();
  });

  it('Should render icon if provided', () => {
    const MockIcon = () => <Text>🔍</Text>;

    render(
      <Input
        icon={<MockIcon />}
        value=""
        placeholder="Enter text"
        onChangeText={jest.fn()}
      />,
    );

    expect(screen.getByText('🔍')).toBeTruthy();
  });

  it('Should be disabled when disabled prop is true', () => {
    render(
      <Input
        value=""
        placeholder="Enter text"
        onChangeText={jest.fn()}
        disabled
      />,
    );

    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeDisabled();
  });

  it('Should be disabled when isLoading prop is true', () => {
    render(
      <Input
        value=""
        placeholder="Enter text"
        onChangeText={jest.fn()}
        isLoading
      />,
    );

    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeDisabled();
  });

  it('Should call onChangeText when input changes', () => {
    const mockOnChangeText = jest.fn();
    render(
      <Input
        value=""
        placeholder="Enter text"
        onChangeText={mockOnChangeText}
      />,
    );

    const input = screen.getByPlaceholderText('Enter text');
    fireEvent.changeText(input, 'Hello');

    expect(mockOnChangeText).toHaveBeenCalledWith('Hello');
  });
});
