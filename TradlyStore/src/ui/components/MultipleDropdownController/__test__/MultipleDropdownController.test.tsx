import { useForm } from 'react-hook-form';
import { render, screen, fireEvent } from '@testing-library/react-native';

// Components
import { MultipleDropdownController } from '..';

// Mocks
import { ADDITIONAL_DETAILS } from '@/mocks';

describe('MultipleDropdownController Component', () => {
  const setup = () => {
    const mockClearErrors = jest.fn();

    const Wrapper = () => {
      const { control } = useForm({
        defaultValues: { testField: [] },
      });

      return (
        <MultipleDropdownController
          label="Test Label"
          placeholder="Select something"
          name="testField"
          control={control}
          clearErrors={mockClearErrors}
          data={ADDITIONAL_DETAILS}
        />
      );
    };

    render(<Wrapper />);

    return { mockClearErrors };
  };

  it('Should render label and placeholder', () => {
    setup();

    expect(screen.getByText('Test Label')).toBeTruthy();
    expect(screen.getByPlaceholderText('Select something')).toBeTruthy();
  });

  it('Should open modal and select an option', () => {
    setup();

    fireEvent.press(screen.getByPlaceholderText('Select something'));
    fireEvent.press(screen.getAllByText(ADDITIONAL_DETAILS[0].label)[0]);

    expect(screen.getAllByText(ADDITIONAL_DETAILS[0].label)[0]).toBeTruthy();
  });

  it('Should call clearErrors when selecting an option', () => {
    const { mockClearErrors } = setup();

    fireEvent.press(screen.getByPlaceholderText('Select something'));
    fireEvent.press(screen.getByText(ADDITIONAL_DETAILS[0].label));

    expect(mockClearErrors).toHaveBeenCalledWith('testField');
  });
});
