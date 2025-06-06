import { memo, Suspense, useCallback, useMemo, useRef, useState } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { FlatList, TouchableOpacity, View, StyleSheet } from 'react-native';
import Animated, { SlideInLeft, SlideOutLeft } from 'react-native-reanimated';

// Components
import { PriceDetails } from '../PriceDetails';
import { Button, CartItem, Text } from '@/components/common';
import { StickyFooter, EmptyList, ConfirmSheet } from '@/components/shared';

// Stores
import { useCartStore, useThemeStore } from '@/stores';

// Hooks
import { useAddressForm } from '@/hooks';

// Interfaces
import { Cart, Order } from '@/interfaces';

// Themes
import { spacing } from '@/themes';

// Utils
import { getTotalCarts, isEmptyObject } from '@/utils';

interface RenderItemProps {
  item: Cart;
  index: number;
}

interface ContentProps {
  isPending: boolean;
  onNavigateAddNewAddress: () => void;
  onSubmit: (payload: Order) => void;
}

export const Content = memo(
  ({ isPending, onNavigateAddNewAddress, onSubmit }: ContentProps) => {
    const { colors } = useTheme();
    const [id, setId] = useState<string>('');
    const permissionSheetRef = useRef<BottomSheet>(null);

    // Stores
    const isDark = useThemeStore((state) => state.isDark);
    const formAddress = useAddressForm((state) => state.form);
    const [carts, updateQuantityItem, removeCart] = useCartStore((state) => [
      state.carts,
      state.updateQuantityItem,
      state.removeCart,
    ]);

    const { username, city, state, zipCode, phone, streetAddress } =
      formAddress;
    const isDisabled = !carts?.length || isEmptyObject(formAddress);
    const { total, totalQuantity } = getTotalCarts(carts || []);
    const stylesDynamic = useMemo(
      () =>
        StyleSheet.create({
          buttonAddressWrapper: {
            width: '100%',
            paddingVertical: spacing['4.5'],
            alignItems: 'center',
            zIndex: 99,
            ...(isDark
              ? { backgroundColor: colors.backgroundSecondary }
              : { backgroundColor: colors.backgroundSecondary, elevation: 5 }),
          },
          addressWrapper: {
            width: '100%',
            paddingVertical: 15,
            paddingHorizontal: spacing[5],
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            elevation: 2,
            ...(isDark ? {} : { backgroundColor: colors.backgroundSecondary }),
          },
          contentContainerStyle: {},
          content: {
            flex: 1,
            backgroundColor: isDark ? colors.primary : colors.tertiary,
          },
        }),
      [colors, isDark],
    );

    const handleToggleModal = useCallback((id: string) => {
      permissionSheetRef.current?.snapToIndex(0);
      setId(id);
    }, []);

    const handleCloseModal = useCallback(() => {
      permissionSheetRef.current?.close();
    }, []);

    const handleQuantityChange = useCallback(
      (id: string, value: string) => {
        updateQuantityItem(id, Number(value));
      },
      [updateQuantityItem],
    );

    const handlePayment = useCallback(() => {
      const payload = {
        username,
        phone,
        address: `${streetAddress}, ${city}, ${state}`,
        zipCode,
        total: total,
      };

      onSubmit(payload);
    }, [city, onSubmit, phone, state, streetAddress, total, username, zipCode]);

    const keyExtractor = useCallback((item: Cart) => item.id, []);

    const handleDelete = useCallback(() => {
      removeCart(id);
      handleCloseModal();
    }, [handleCloseModal, id, removeCart]);

    // Render
    const renderItem = useCallback(
      ({
        item: { id, name, image, quantity, price, discount },
        index,
      }: RenderItemProps) => {
        const isFirstItem = index === 0;
        const animation = isFirstItem
          ? SlideInLeft.delay(index * 500)
          : SlideInLeft.delay(index * 200);

        return (
          <Animated.View entering={animation} exiting={SlideOutLeft}>
            <CartItem
              key={id}
              id={id}
              name={name}
              image={image}
              quantity={quantity}
              price={price}
              discount={discount}
              onOpenModal={handleToggleModal}
              onUpdateQuantityItem={handleQuantityChange}
            />
          </Animated.View>
        );
      },
      [handleQuantityChange, handleToggleModal],
    );

    return (
      <StickyFooter
        isLoading={isPending}
        disabled={isDisabled}
        content={<PriceDetails total={total} totalQuantity={totalQuantity} />}
        buttonText="Continue to Payment"
        onPress={handlePayment}
      >
        <View style={stylesDynamic.content}>
          {isEmptyObject(formAddress) ? (
            <TouchableOpacity
              accessibilityRole="button"
              style={stylesDynamic.buttonAddressWrapper}
              onPress={onNavigateAddNewAddress}
            >
              <Text fontWeight="normal" color="placeholder">
                + Add New Address
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={stylesDynamic.addressWrapper}>
              <View style={styles.textDelivery}>
                <Text color="placeholder" numberOfLines={1}>
                  Deliver to {username}, {zipCode}
                </Text>
                <Text
                  color="placeholder"
                  textStyle={styles.text}
                  numberOfLines={1}
                >
                  {city}, {state}
                </Text>
              </View>
              <Button
                textSize="xs"
                buttonStyles={styles.button}
                onPress={onNavigateAddNewAddress}
              >
                Change
              </Button>
            </View>
          )}

          <FlatList
            data={carts}
            showsVerticalScrollIndicator={false}
            keyExtractor={keyExtractor}
            contentContainerStyle={[
              styles.contentContainerStyle,
              stylesDynamic.contentContainerStyle,
            ]}
            ListEmptyComponent={<EmptyList text="Your cart is empty." />}
            initialNumToRender={3} // number of items to render initially
            maxToRenderPerBatch={3} // number of items to render per batch
            updateCellsBatchingPeriod={50} // time in ms to wait before rendering the next batch
            windowSize={5} // number of items to keep in memory outside the viewport
            removeClippedSubviews={true} // unmount components when outside of the viewport
            renderItem={renderItem}
          />

          <Suspense fallback={null}>
            <ConfirmSheet
              title={'Delete Product?'}
              description={
                'Are you sure you want to delete this product? This action cannot be undone.'
              }
              buttonConfirmText="Delete"
              sheetRef={permissionSheetRef}
              onConfirm={handleDelete}
              onCancel={handleCloseModal}
            />
          </Suspense>
        </View>
      </StickyFooter>
    );
  },
);

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: spacing['2.5'],
    paddingBottom: spacing[7],
  },
  textDelivery: { gap: spacing[1.5], width: '70%' },
  text: { opacity: 0.7 },
  button: {
    width: 100,
    height: 23,
  },
});
