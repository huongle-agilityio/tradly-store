import { ComponentProps, useCallback } from 'react';
import {
  Control,
  useController,
  FieldValues,
  Path,
  UseFormClearErrors,
} from 'react-hook-form';

// Components
import { MultipleDropdown } from '../MultipleDropdown';

// Types
import { Option } from '@/interfaces';

interface MultipleDropdownControllerProps<
  T extends FieldValues,
  K extends Path<T>,
> extends Omit<
    ComponentProps<typeof MultipleDropdown>,
    'options' | 'selectedItems' | 'onChange'
  > {
  name: K;
  data: Option[];
  control: Control<T>;
  clearErrors: UseFormClearErrors<T>;
  onFocusNextInput?: (index?: number) => void;
}

export const MultipleDropdownController = <
  T extends FieldValues,
  K extends Path<T>,
>({
  data,
  name,
  control,
  clearErrors,
  ...props
}: MultipleDropdownControllerProps<T, K>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const { onChange, value = [] } = field;

  /**
   * Function onChange select and clear error if any
   * @param value - value select
   */
  const handleOnChange = useCallback(
    (value: string[]) => {
      onChange(value);
      clearErrors(name);
    },
    [clearErrors, name, onChange],
  );

  return (
    <MultipleDropdown
      {...props}
      onChange={handleOnChange}
      error={error?.message}
      selectedItems={value}
      options={data}
    />
  );
};
