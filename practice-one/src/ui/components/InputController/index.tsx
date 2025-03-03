import { ComponentProps, useCallback } from 'react';
import {
  Control,
  useController,
  FieldValues,
  Path,
  UseFormClearErrors,
} from 'react-hook-form';

// Components
import { Input } from '../Input';

interface InputControllerProps<T extends FieldValues, K extends Path<T>>
  extends Omit<ComponentProps<typeof Input>, 'onChangeText' | 'value'> {
  name: K;
  control: Control<T>;
  clearErrors: UseFormClearErrors<T>;
}

export const InputController = <T extends FieldValues, K extends Path<T>>({
  name,
  control,
  clearErrors,
  ...props
}: InputControllerProps<T, K>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const { onChange, value } = field;

  /**
   * Function onChange input and clear error if any
   * @param text - value input
   */
  const handleOnChange = useCallback(
    (text: string) => {
      onChange(text);
      clearErrors(name);
    },
    [clearErrors, name, onChange],
  );

  return (
    <Input
      value={value}
      onChangeText={handleOnChange}
      error={error?.message}
      {...props}
    />
  );
};
