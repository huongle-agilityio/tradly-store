import { memo, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import {
  Gesture,
  GestureDetector,
  ScrollView,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { View, StyleSheet } from 'react-native';

// Components
import { Categories } from '../Categories';
import { ListProduct } from '@/components/shared';
import { Button, Text } from '@/components/common';

// Icons
import { HomeAnimationIcon } from '@/components/icons';

// Constants
import { QUERY_KEY } from '@/constants';

// Interfaces
import { Product } from '@/interfaces';

// Themes
import { spacing } from '@/themes';

const TOUCH_SLOP = 5;
const TIME_TO_ACTIVATE_PAN = 70;

interface ContentProps {
  isLoadingProductSorted: boolean;
  isLoadingProductHasDiscount: boolean;
  productSorted: Product[];
  productHasDiscount: Product[];
  onRedirectNewProduct: () => void;
  onRedirectPopularProduct: () => void;
  onNavigateProductDetail: (id: string) => void;
  onRedirectProductCategory: (name: string, query: string) => void;
}

export const Content = memo(
  ({
    isLoadingProductSorted,
    isLoadingProductHasDiscount,
    productSorted,
    productHasDiscount,
    onRedirectNewProduct,
    onRedirectPopularProduct,
    onRedirectProductCategory,
    onNavigateProductDetail,
  }: ContentProps) => {
    const { colors } = useTheme();
    const queryClient = useQueryClient();
    const [isLoadingVisible, setLoadingVisible] = useState(false);

    const loadingHeight = useSharedValue(0);
    const touchStart = useSharedValue({ x: 0, y: 0, time: 0 });
    const gestureActive = useSharedValue(false);

    const fetchData = () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.PRODUCT_BY_PARAMS({
          sortCreatedAt: 'desc',
          hasDiscount: true,
        }),
      });
    };

    const showBar = () => {
      setLoadingVisible(true);

      loadingHeight.value = withTiming(50, { duration: 300 });

      loadingHeight.value = withDelay(
        2000,
        withTiming(0, { duration: 300 }, () => {
          runOnJS(setLoadingVisible)(false);
        }),
      );
    };

    const panGesture = Gesture.Pan()
      .manualActivation(true)
      .onTouchesDown((e) => {
        const touch = e.changedTouches[0];
        touchStart.value = {
          x: touch.x,
          y: touch.y,
          time: Date.now(),
        };
      })
      .onTouchesMove((e, state) => {
        const touch = e.changedTouches[0];
        const dx = Math.abs(touchStart.value.x - touch.x);
        const dy = Math.abs(touchStart.value.y - touch.y);
        const dt = Date.now() - touchStart.value.time;

        if (dt > TIME_TO_ACTIVATE_PAN) {
          state.activate();
        } else if (dx > TOUCH_SLOP || dy > TOUCH_SLOP) {
          state.fail();
        }
      })
      .onUpdate((e) => {
        if (e.translationY > 0 && !gestureActive.value) {
          gestureActive.value = true;
          runOnJS(showBar)();
          runOnJS(fetchData)();
        }
      })
      .onEnd(() => {
        gestureActive.value = false;
      });

    const animatedStyle = useAnimatedStyle(() => ({
      height: loadingHeight.value,
    }));

    return (
      <GestureDetector gesture={panGesture}>
        <ScrollView>
          {isLoadingVisible && (
            <Animated.View style={[animatedStyle, styles.pullToRefreshArea]}>
              <View style={styles.center}>
                <HomeAnimationIcon color={colors.text.default} />
                <Text fontSize="xs">Loading ...</Text>
              </View>
            </Animated.View>
          )}

          <View style={styles.wrapper}>
            <Categories onPress={onRedirectProductCategory} />

            {/* New Product */}
            <View style={styles.contentWrapper}>
              <View style={styles.content}>
                <Text fontWeight="bold" fontSize="lg" color="placeholder">
                  New Product
                </Text>
                <Button
                  textSize="xs"
                  buttonStyles={styles.button}
                  onPress={onRedirectNewProduct}
                >
                  See All
                </Button>
              </View>
              <ListProduct
                data={productSorted}
                isLoading={isLoadingProductSorted}
                horizontal={true}
                onNavigateProductDetail={onNavigateProductDetail}
              />
            </View>

            {/* Popular Product */}
            <View style={styles.contentWrapper}>
              <View style={styles.content}>
                <Text fontWeight="bold" fontSize="lg" color="placeholder">
                  Popular Product
                </Text>
                <Button
                  textSize="xs"
                  buttonStyles={styles.button}
                  onPress={onRedirectPopularProduct}
                >
                  See All
                </Button>
              </View>
              <ListProduct
                data={productHasDiscount}
                isLoading={isLoadingProductHasDiscount}
                horizontal={true}
                onNavigateProductDetail={onNavigateProductDetail}
              />
            </View>
          </View>
        </ScrollView>
      </GestureDetector>
    );
  },
);

const styles = StyleSheet.create({
  wrapper: { gap: spacing[7], marginTop: spacing[4], marginBottom: 90 },
  contentWrapper: { gap: spacing[4] },
  content: {
    paddingHorizontal: spacing[5],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: { width: 90 },
  pullToRefreshArea: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    overflow: 'hidden',
  },
  center: { justifyContent: 'center', alignItems: 'center' },
});
