import { ComponentProps, RefObject, useCallback, useMemo } from 'react';
import { TextInput } from 'react-native';
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
  refs?: RefObject<TextInput | null>[];
  index?: number;
  name: K;
  control: Control<T>;
  clearErrors: UseFormClearErrors<T>;
  onFocusNextInput?: (index?: number) => void;
}

export const InputController = <T extends FieldValues, K extends Path<T>>({
  refs,
  index = 1,
  name,
  control,
  clearErrors,
  onFocusNextInput,
  ...props
}: InputControllerProps<T, K>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const { onChange, value } = field;
  const getKeyType = useMemo(
    () => (index + 1 < (refs?.length ?? 0) ? 'next' : 'done'),
    [index, refs],
  );

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

  const handleSubmitEditing = useCallback(() => {
    onFocusNextInput?.(index);
  }, [index, onFocusNextInput]);

  return (
    <Input
      ref={refs?.[index]}
      value={value}
      onSubmitEditing={handleSubmitEditing}
      returnKeyType={getKeyType}
      onChangeText={handleOnChange}
      error={error?.message}
      {...props}
    />
  );
};
