import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import { useForm } from 'react-hook-form';

// Components
import { InputController } from '..';

describe('InputController Component', () => {
  const setup = () => {
    const mockClearErrors = jest.fn();

    const Wrapper = () => {
      const { control } = useForm({
        defaultValues: { test: '' },
      });

      return (
        <InputController
          label="Test Label"
          name="test"
          control={control}
          clearErrors={mockClearErrors}
        />
      );
    };

    render(<Wrapper />);

    return { mockClearErrors };
  };

  it('Should render the component with label and input', () => {
    setup();

    expect(screen.getByText(/Test Label/i)).toBeTruthy();
  });

  it('Should update input value and call clearErrors on change', async () => {
    const { mockClearErrors } = setup();
    const input = screen.getByText(/Test Label/i);

    fireEvent.changeText(input, 'Hello');

    await waitFor(() => {
      expect(screen.getByDisplayValue('Hello')).toBeTruthy();
    });

    expect(mockClearErrors).toHaveBeenCalledTimes(1);
  });
});
