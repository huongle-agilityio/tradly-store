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

interface DropdownControllerProps<T extends FieldValues, K extends Path<T>>
  extends Omit<ComponentProps<typeof Dropdown>, 'onChange' | 'value'> {
  name: K;
  data: Option[];
  control: Control<T>;
  clearErrors: UseFormClearErrors<T>;
}

export const DropdownController = <T extends FieldValues, K extends Path<T>>({
  data,
  name,
  control,
  clearErrors,
  ...props
}: DropdownControllerProps<T, K>) => {
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
      {...props}
      onChange={handleOnChange}
      value={value}
      error={error?.message}
      options={data}
    />
  );
};
