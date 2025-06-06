import { Asset } from 'react-native-image-picker';
import { ComponentProps, useCallback } from 'react';
import {
  Control,
  useController,
  FieldValues,
  Path,
  UseFormClearErrors,
  UseFormSetError,
} from 'react-hook-form';

// Components
import { PhotosUpload } from '../PhotosUpload';

interface PhotosUploadControllerProps<T extends FieldValues, K extends Path<T>>
  extends Omit<
    ComponentProps<typeof PhotosUpload>,
    'onSelectImage' | 'selectedImages' | 'onSetError'
  > {
  name: K;
  control: Control<T>;
  clearErrors: UseFormClearErrors<T>;
  setError: UseFormSetError<T>;
}

export const PhotosUploadController = <
  T extends FieldValues,
  K extends Path<T>,
>({
  name,
  control,
  clearErrors,
  setError,
}: PhotosUploadControllerProps<T, K>) => {
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

  const handleSetError = useCallback(
    (error: string) => {
      setError(name, { message: error });
    },
    [name, setError],
  );

  return (
    <PhotosUpload
      onSelectImage={handleOnChange}
      error={error?.message}
      selectedImages={value}
      onSetError={handleSetError}
    />
  );
};
