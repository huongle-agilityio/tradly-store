import { memo, useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

// Components
import { ProductCarousel } from '@/components/common';

// Icons
import {
  ArrowLeftIcon,
  MenuDotIcon,
  OutlineHeartIcon,
  ShareIcon,
} from '@/components/icons';

// Themes
import { radius } from '@/themes';

interface HeaderProps {
  slideImages: string[];
  opacity: SharedValue<number>;
  scrollY: SharedValue<number>;
  handleBack: () => void;
}
const HEADER_MAX_HEIGHT = 226;
const HEADER_MIN_HEIGHT = 70;
const SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export const Header = memo(
  ({ scrollY, opacity, slideImages, handleBack }: HeaderProps) => {
    const { colors } = useTheme();

    const stylesDynamic = useMemo(
      () =>
        StyleSheet.create({
          backgroundIcon: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: colors.backgroundSecondary,
            borderRadius: radius.full,
            opacity: 0.5,
          },
          icon: {
            position: 'relative',
            width: 32,
            height: 32,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: radius.full,
            backgroundColor: colors.backgroundOpacity,
            borderWidth: 1,
            borderColor: colors.light,
          },
        }),
      [colors],
    );

    const smoothScrollY = useDerivedValue(() => {
      return withTiming(scrollY.value, { duration: 100 });
    });

    const animatedHeaderStyle = useAnimatedStyle(() => ({
      height: interpolate(
        smoothScrollY.value,
        [0, SCROLL_DISTANCE],
        [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        Extrapolation.CLAMP,
      ),
    }));

    const animatedBackgroundHeaderStyle = useAnimatedStyle(() => {
      const backgroundColor = interpolate(
        smoothScrollY.value,
        [0, SCROLL_DISTANCE],
        [0, 1],
        Extrapolation.CLAMP,
      );

      return {
        backgroundColor: withTiming(
          backgroundColor < 0.5 ? colors.transparent : colors.primary,
          { duration: 100 },
        ),
        justifyContent: backgroundColor < 0.5 ? 'flex-start' : 'center',
      };
    });

    const animatedOpacityHeaderStyle = useAnimatedStyle(() => ({
      opacity: interpolate(
        opacity.value,
        [0, SCROLL_DISTANCE],
        [1, 0],
        Extrapolation.CLAMP,
      ),
    }));

    return (
      <Animated.View
        style={[
          animatedHeaderStyle,
          styles.container,
          animatedBackgroundHeaderStyle,
        ]}
      >
        <Animated.View style={styles.header}>
          <TouchableOpacity
            accessibilityRole="button"
            style={stylesDynamic.icon}
            onPress={handleBack}
          >
            <ArrowLeftIcon size={18} color={colors.light} />
            <View style={stylesDynamic.backgroundIcon} />
          </TouchableOpacity>

          <View style={styles.iconWrapper}>
            <View style={stylesDynamic.icon}>
              <ShareIcon size={18} color={colors.light} />
              <View style={stylesDynamic.backgroundIcon} />
            </View>
            <View style={stylesDynamic.icon}>
              <OutlineHeartIcon size={18} color={colors.light} />
              <View style={stylesDynamic.backgroundIcon} />
            </View>
            <View style={stylesDynamic.icon}>
              <MenuDotIcon size={18} color={colors.light} />
              <View style={stylesDynamic.backgroundIcon} />
            </View>
          </View>
        </Animated.View>
        <Animated.View
          style={[
            styles.carouselWrapper,
            animatedHeaderStyle,
            animatedOpacityHeaderStyle,
          ]}
        >
          <ProductCarousel images={slideImages} />
        </Animated.View>
      </Animated.View>
    );
  },
);

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    zIndex: 9999,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  carouselWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  iconWrapper: { flexDirection: 'row', gap: 13 },
  button: { height: 23 },
});
