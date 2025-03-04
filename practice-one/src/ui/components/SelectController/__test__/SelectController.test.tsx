import { Pressable } from 'react-native';
import { useForm, UseFormClearErrors } from 'react-hook-form';
import { fireEvent, render, screen } from '@testing-library/react-native';

// Components
import { Text } from '../../Text';
import { SelectController } from '..';

// Interfaces
import { CART_QUANTITY } from '@/mocks';

describe('SelectController Component', () => {
  const Wrapper = ({
    defaultValue = '',
    mockClearErrors,
  }: {
    defaultValue?: string;
    mockClearErrors?: UseFormClearErrors<any>;
  }) => {
    const { control, clearErrors } = useForm({
      defaultValues: { selectField: defaultValue },
    });

    return (
      <SelectController
        name="selectField"
        options={CART_QUANTITY}
        control={control}
        clearErrors={mockClearErrors || clearErrors}
      />
    );
  };

  it('should render the component with provided options', () => {
    render(<Wrapper />);
    expect(screen.getByTestId('select-box')).toBeTruthy();
  });

  it('should update value and call clearErrors on change', async () => {
    const mockClearErrors = jest.fn();
    render(<Wrapper mockClearErrors={mockClearErrors} />);

    const select = screen.getByTestId('select-box');
    fireEvent.press(select);
    expect(screen.getByText(CART_QUANTITY[2].label)).toBeTruthy();
    fireEvent.press(screen.getByText(CART_QUANTITY[2].label));

    expect(mockClearErrors).toHaveBeenCalledTimes(1);
  });

  it('should display error message when validation fails', async () => {
    const WrapperWithError = () => {
      const { control, setError } = useForm({
        defaultValues: { selectField: '' },
      });

      return (
        <>
          <SelectController
            name="selectField"
            options={CART_QUANTITY}
            control={control}
            clearErrors={jest.fn()}
          />
          <Pressable
            onPress={() => setError('selectField', { message: 'Required' })}
          >
            <Text>Trigger Error</Text>
          </Pressable>
        </>
      );
    };

    render(<WrapperWithError />);

    fireEvent.press(screen.getByText('Trigger Error'));

    expect(await screen.findByText(/Required/i)).toBeTruthy();
  });
});
