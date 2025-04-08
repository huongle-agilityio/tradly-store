import { Asset } from 'react-native-image-picker';
import { ComponentProps, useCallback } from 'react';
import {
  Control,
  useController,
  FieldValues,
  Path,
  UseFormClearErrors,
} from 'react-hook-form';

// Components
import { ProductPhotosUpload } from '../ProductPhotosUpload';

interface MultipleDropdownControllerProps<
  T extends FieldValues,
  K extends Path<T>,
> extends Omit<
    ComponentProps<typeof ProductPhotosUpload>,
    'onSelectImage' | 'selectedImages'
  > {
  name: K;
  control: Control<T>;
  clearErrors: UseFormClearErrors<T>;
}

export const ProductPhotosUploadController = <
  T extends FieldValues,
  K extends Path<T>,
>({
  name,
  control,
  clearErrors,
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
    (value: Asset[]) => {
      onChange(value);
      clearErrors(name);
    },
    [clearErrors, name, onChange],
  );

  return (
    <ProductPhotosUpload
      onSelectImage={handleOnChange}
      error={error?.message}
      selectedImages={value}
    />
  );
};
