import { memo, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
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

const REFRESH_AREA_HEIGHT = 50;
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
    const queryClient = useQueryClient();
    const { colors } = useTheme();

    const [toggleGesture, setToggleGesture] = useState(true);
    const [gestureActive, setGestureActive] = useState(false);
    const translationY = useSharedValue(0);
    const pullUpTranslate = useSharedValue(0);

    const fetchData = () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.PRODUCT_BY_PARAMS({
          sortCreatedAt: 'desc',
          hasDiscount: true,
        }),
      });

      setTimeout(() => {
        translationY.value = withTiming(0, { duration: 200 }, () => {
          pullUpTranslate.value = 0;
        });
      }, 3000);
    };

    /**
     * Animates the pull-up gesture to fetch new data.
     *
     * @returns {void}
     */
    const pullUpAnimation = () => {
      pullUpTranslate.value = withDelay(
        0,
        withTiming(
          pullUpTranslate.value === 0 ? -10 : 0,
          { duration: 200 },
          (finished) => {
            if (finished) {
              runOnJS(fetchData)();
            }
          },
        ),
      );
    };

    const gesture = Gesture.Pan()
      .onBegin(() => {
        runOnJS(setGestureActive)(true);
      })
      .onUpdate((event) => {
        const total = translationY.value + event.translationY;

        if (total < REFRESH_AREA_HEIGHT) {
          translationY.value = total;
        } else {
          translationY.value = REFRESH_AREA_HEIGHT;
        }
      })
      .onEnd(() => {
        runOnJS(setGestureActive)(false);
        if (translationY.value <= REFRESH_AREA_HEIGHT - 1) {
          translationY.value = withTiming(0, { duration: 200 });
        } else {
          runOnJS(pullUpAnimation)();
        }

        if (!(translationY.value > 0)) {
          runOnJS(setToggleGesture)(false);
        }
      });

    const handleOnScroll = (event: {
      nativeEvent: { contentOffset: { y: number } };
    }) => {
      const position = event.nativeEvent.contentOffset.y;
      if (position <= 0) {
        setToggleGesture(true);
      } else if (position > 0 && toggleGesture && !gestureActive) {
        setToggleGesture(false);
      }
    };
    const animatedSpace = useAnimatedStyle(() => ({
      height: translationY.value,
    }));

    return (
      <>
        <Animated.View style={[styles.pullToRefreshArea, animatedSpace]}>
          <Animated.View style={styles.center}>
            <HomeAnimationIcon color={colors.text.default} />
            <Text fontSize="xs">Loading ...</Text>
          </Animated.View>
        </Animated.View>

        <GestureDetector gesture={gesture}>
          <Animated.ScrollView
            style={styles.container}
            onScroll={handleOnScroll}
          >
            <View style={styles.wrapper}>
              <Categories onPress={onRedirectProductCategory} />
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
          </Animated.ScrollView>
        </GestureDetector>
      </>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
