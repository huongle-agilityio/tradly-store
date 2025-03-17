import { ComponentProps, useCallback } from 'react';
import {
  Control,
  useController,
  FieldValues,
  Path,
  UseFormClearErrors,
} from 'react-hook-form';

// Components
import { Dropdown } from '../Dropdown';

// Types
import { Option } from '@/interfaces';

interface SelectControllerProps<T extends FieldValues, K extends Path<T>>
  extends Omit<ComponentProps<typeof Dropdown>, 'onValueChange' | 'value'> {
  name: K;
  options: Option[];
  control: Control<T>;
  clearErrors: UseFormClearErrors<T>;
}

export const SelectController = <T extends FieldValues, K extends Path<T>>({
  options,
  name,
  control,
  clearErrors,
  ...props
}: SelectControllerProps<T, K>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const { onChange, value } = field;

  /**
   * Function onChange select and clear error if any
   * @param value - value select
   */
  const handleOnChange = useCallback(
    (value: string) => {
      onChange(value);
      clearErrors(name);
    },
    [clearErrors, name, onChange],
  );

  return (
    <Dropdown
      value={value}
      onValueChange={handleOnChange}
      error={error?.message}
      {...props}
      items={options}
    />
  );
};
