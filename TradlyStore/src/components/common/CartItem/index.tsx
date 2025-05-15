import { memo, useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Image, TouchableOpacity, View, StyleSheet } from 'react-native';

// Components
import { Text } from '../Text';
import { Dropdown } from '../Dropdown';

// Icons
import { ArrowDownIcon, TrashIcon } from '@/components/icons';

// Stores
import { useThemeStore } from '@/stores';

// Mocks
import { CART_QUANTITY } from '@/mocks';

// Hooks
import { useMedia } from '@/hooks';

// Themes
import { spacing } from '@/themes';

// Utils
import { calculateDiscountedPrice } from '@/utils';

export interface CartItemProps {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  discount?: number;
  onRemoveItem?: (id: string) => void;
  onUpdateQuantityItem?: (id: string, value: string) => void;
}

export const CartItem = memo(
  ({
    id,
    name,
    image,
    quantity,
    price,
    discount,
    onRemoveItem,
    onUpdateQuantityItem,
  }: CartItemProps) => {
    const { width } = useMedia();
    const { colors } = useTheme();

    // CartItem height
    const opacity = useSharedValue(1);
    const itemHeight = useSharedValue(205);
    const marginVertical = useSharedValue(10);
    const translationX = useSharedValue(0);

    // Store
    const isDark = useThemeStore((state) => state.isDark);

    const TRANSLATION_OUT_SCREEN_X = -width * 0.7;
    const stylesDynamic = useMemo(
      () =>
        StyleSheet.create({
          gapContent: {
            gap: 15,
            ...(onRemoveItem
              ? { paddingBottom: spacing[3], paddingTop: spacing['7.5'] }
              : { paddingVertical: 25 }),
          },
          cartWrapper: {
            backgroundColor: colors.light,
            elevation: 5,
          },
          buttonBorder: {
            borderTopColor: colors.productCard.border,
          },
        }),
      [colors, onRemoveItem],
    );

    const handleRemoveItem = () => {
      onRemoveItem?.(id);
    };

    const handleUpdateQuantity = (value: string) => {
      onUpdateQuantityItem?.(id, value);
    };

    const panGesture = Gesture.Pan()
      .minVelocityX(-20)
      .onUpdate((e) => {
        if (e.translationX > 0) return;
        translationX.value = e.translationX;
      })
      .onEnd(() => {
        const shouldDismiss = translationX.value < TRANSLATION_OUT_SCREEN_X;
        if (shouldDismiss) {
          translationX.value = withTiming(-width);
          itemHeight.value = withTiming(0);
          marginVertical.value = withTiming(0);
          opacity.value = withTiming(0);
          runOnJS(handleRemoveItem)();
        } else {
          translationX.value = withTiming(0);
        }
      });

    const animatedStyles = useAnimatedStyle(() => ({
      transform: [{ translateX: translationX.value }],
    }));

    const animatedIconStyles = useAnimatedStyle(() => ({
      opacity: withTiming(
        translationX.value < -(width / 2) ? opacity.value : 0,
        {
          duration: 200,
        },
      ),
    }));

    const animatedHeight = useAnimatedStyle(() => ({
      height: itemHeight.value,
    }));

    const animatedVertical = useAnimatedStyle(() => ({
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    }));

    return (
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[stylesDynamic.cartWrapper, animatedVertical]}>
          <Animated.View style={[animatedStyles, animatedHeight]}>
            <View style={[styles.content, stylesDynamic.gapContent]}>
              <Image
                source={{
                  uri: image,
                }}
                accessibilityRole="image"
                accessibilityLabel={`image of ${name} product`}
                style={{
                  width: spacing[30],
                  height: spacing[30],
                  borderRadius: spacing['2.5'],
                }}
              />

              <View style={styles.textWrapper}>
                <Text fontWeight="normal" color="placeholder">
                  {name}
                </Text>

                <View style={styles.priceWrapper}>
                  <Text fontWeight="bold" color="secondary" fontSize="lg">
                    ${calculateDiscountedPrice(price, discount)}
                  </Text>
                  {!!discount && (
                    <View style={styles.discountWrapper}>
                      <Text
                        fontWeight="normal"
                        color="placeholder"
                        textStyle={styles.discountText}
                      >
                        ${price}
                      </Text>
                      <Text fontWeight="normal" color="placeholder">
                        {discount}% off
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.quantityWrapper}>
                  <Text fontSize="sm" fontWeight="normal" color="placeholder">
                    Qty:
                  </Text>
                  <Dropdown
                    options={CART_QUANTITY}
                    value={quantity.toString()}
                    disabled={!onUpdateQuantityItem}
                    onChange={handleUpdateQuantity}
                    renderRightIcon={
                      <ArrowDownIcon
                        size={10}
                        {...(isDark && {
                          color: colors.input.textPlaceholder,
                        })}
                      />
                    }
                    style={{ width: 60 }}
                  />
                </View>
              </View>
            </View>
            {onRemoveItem && (
              <TouchableOpacity
                accessibilityRole="button"
                style={[styles.buttonWrapper, stylesDynamic.buttonBorder]}
                onPress={handleRemoveItem}
              >
                <Text fontWeight="normal" color="placeholder">
                  Remove
                </Text>
              </TouchableOpacity>
            )}
          </Animated.View>

          <Animated.View style={[styles.deleteIcon, animatedIconStyles]}>
            <View style={styles.deleteIconWrapper} />
            <TrashIcon
              width={40}
              height={40}
              color={colors.error}
              style={styles.icon}
            />
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    );
  },
);

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing[4],
    flexDirection: 'row',
  },
  textWrapper: {
    justifyContent: 'space-between',
    paddingTop: spacing['3.5'],
    paddingBottom: spacing['2.5'],
  },
  priceWrapper: { flexDirection: 'row', gap: spacing['3.5'] },
  quantityWrapper: { flexDirection: 'row', alignItems: 'center' },
  buttonWrapper: {
    width: '100%',
    paddingVertical: spacing[3],
    alignItems: 'center',
    borderTopWidth: 0.5,
  },
  discountWrapper: { flexDirection: 'row', gap: 5 },
  discountText: {
    textDecorationLine: 'line-through',
  },
  deleteIcon: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  deleteIconWrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
    position: 'absolute',
    opacity: 0.2,
  },
  icon: { alignSelf: 'flex-end', marginRight: 40 },
});
