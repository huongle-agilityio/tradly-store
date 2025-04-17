import { Pressable } from 'react-native';
import { useForm, UseFormClearErrors } from 'react-hook-form';
import { fireEvent, render, screen } from '@testing-library/react-native';

// Components
import { Text } from '../../Text';
import { DropdownController } from '..';

// Interfaces
import { CART_QUANTITY } from '@/mocks';

describe('DropdownController Component', () => {
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
      <DropdownController
        name="selectField"
        options={CART_QUANTITY}
        control={control}
        clearErrors={mockClearErrors || clearErrors}
      />
    );
  };

  it('Should render the component with provided options', () => {
    render(<Wrapper />);

    expect(screen.getByTestId('single-select-modal')).toBeTruthy();
  });

  it('Should display error message when validation fails', async () => {
    const WrapperWithError = () => {
      const { control, setError } = useForm({
        defaultValues: { selectField: '' },
      });

      return (
        <>
          <DropdownController
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
