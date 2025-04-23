import { memo, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

// Components
import {
  InputController,
  MultipleDropdownController,
} from '@/components/common';
import { StickyFooter } from '@/components/shared';
import { PhotosUploadController } from '../PhotosUploadController';

// Icons
import { MapIcon, MoneyIcon } from '@/components/icons';

// Hooks
import { useFocusInput } from '@/hooks';

// Interfaces
import { Product, ProductFormData } from '@/interfaces';

// Schemas
import { productSchema } from '@/schemas';

// Themes
import { colors, spacing } from '@/themes';

// Mocks
import { ADDITIONAL_DETAILS } from '@/mocks';

// Utils
import { isEmptyObject } from '@/utils';

interface FormAddressProps {
  isLoading?: boolean;
  product?: Product;
  onSubmit: (data: ProductFormData) => void;
}

export const FormProduct = memo(
  ({ isLoading, product, onSubmit }: FormAddressProps) => {
    const { focusNextInput, refs } = useFocusInput(8);

    const initForm = useMemo(
      () => ({
        title: product?.title || '',
        category: product?.category || '',
        price: product?.price.toString() || '',
        discount: product?.discount.toString() || '',
        quantity: product?.quantity.toString() || '',
        location: product?.location || '',
        priceType: product?.priceType || '',
        description: product?.description || '',
        slideImages: product?.slideImages || [],
        additionalDetails: product?.additionalDetails || [],
      }),
      [
        product?.additionalDetails,
        product?.category,
        product?.description,
        product?.discount,
        product?.location,
        product?.price,
        product?.priceType,
        product?.quantity,
        product?.slideImages,
        product?.title,
      ],
    );

    const {
      control,
      clearErrors,
      reset,
      setError,
      formState: { isDirty },
      handleSubmit: submitForm,
    } = useForm<ProductFormData>({
      resolver: valibotResolver(productSchema),
      mode: 'onSubmit',
      defaultValues: initForm,
    });

    useEffect(() => {
      if (product) {
        reset(initForm);
      }
    }, [initForm, product, reset]);

    return (
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainerStyle}
      >
        <StickyFooter
          disabled={!isDirty}
          isLoading={isLoading}
          buttonText={isEmptyObject(product) ? 'Save' : 'Update'}
          onPress={submitForm(onSubmit)}
        >
          <PhotosUploadController
            name="slideImages"
            clearErrors={clearErrors}
            control={control}
            setError={setError}
          />
          <View style={styles.formWrapper}>
            <InputController
              index={0}
              refs={refs}
              name="title"
              variant="underlined"
              label="Product Name"
              onFocusNextInput={focusNextInput}
              placeholder="Enter the product name"
              clearErrors={clearErrors}
              control={control}
            />
            <InputController
              index={1}
              refs={refs}
              name="category"
              variant="underlined"
              label="Category Product"
              onFocusNextInput={focusNextInput}
              placeholder="Enter the category of product"
              clearErrors={clearErrors}
              control={control}
            />
            <View style={styles.priceWrapper}>
              <InputController
                index={2}
                refs={refs}
                name="price"
                label="Price"
                keyboardType="number-pad"
                variant="underlined"
                onFocusNextInput={focusNextInput}
                placeholder="Enter the price"
                clearErrors={clearErrors}
                control={control}
                icon={<MoneyIcon />}
                styleContainer={styles.price}
              />
              <InputController
                index={3}
                refs={refs}
                name="discount"
                label="Sales Price"
                keyboardType="number-pad"
                variant="underlined"
                onFocusNextInput={focusNextInput}
                placeholder="Enter percentage"
                clearErrors={clearErrors}
                control={control}
                icon={<MoneyIcon />}
                styleContainer={styles.price}
              />
            </View>
            <InputController
              index={4}
              refs={refs}
              name="quantity"
              label="Quantity"
              keyboardType="number-pad"
              variant="underlined"
              onFocusNextInput={focusNextInput}
              placeholder="Enter quantity"
              clearErrors={clearErrors}
              control={control}
            />
            <InputController
              index={5}
              refs={refs}
              name="location"
              label="Location Details"
              variant="underlined"
              onFocusNextInput={focusNextInput}
              placeholder="Enter your street address"
              iconRight={<MapIcon style={styles.opacity} />}
              clearErrors={clearErrors}
              control={control}
            />
            <InputController
              index={6}
              refs={refs}
              name="description"
              label="Product Description"
              variant="underlined"
              onFocusNextInput={focusNextInput}
              placeholder="Enter description"
              clearErrors={clearErrors}
              multiline
              numberOfLines={4}
              control={control}
            />
            <InputController
              index={7}
              refs={refs}
              name="priceType"
              label="Price Type"
              variant="underlined"
              onFocusNextInput={focusNextInput}
              placeholder="Enter the price type"
              clearErrors={clearErrors}
              control={control}
            />
            <MultipleDropdownController
              name="additionalDetails"
              label="Additional Details"
              placeholder="Enter the additional details"
              clearErrors={clearErrors}
              control={control}
              data={ADDITIONAL_DETAILS}
            />
          </View>
        </StickyFooter>
      </KeyboardAwareScrollView>
    );
  },
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.light },
  locationWrapper: { lineHeight: 24 },
  contentContainerStyle: { flexGrow: 1 },
  currentLocationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
    paddingVertical: spacing[5],
    backgroundColor: colors.light,
    elevation: spacing['2.5'],
  },
  opacity: { opacity: 0.7 },
  formWrapper: {
    backgroundColor: colors.light,
    paddingHorizontal: spacing[7],
    paddingTop: spacing[9],
    paddingBottom: 50,
    gap: spacing[4],
  },
  price: { width: '45%' },
  priceWrapper: { flexDirection: 'row', gap: 40 },
});
