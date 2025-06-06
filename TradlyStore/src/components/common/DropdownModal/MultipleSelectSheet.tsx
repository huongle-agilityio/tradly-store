import { Ref, useCallback, useMemo } from 'react';
import { Portal } from '@gorhom/portal';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useTheme } from '@react-navigation/native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { SheetBackDrop } from '../SheetBackDrop';
import { modalStyles } from './styles';

// Components
import { OptionItem } from './OptionItem';

// Interfaces
import { Option } from '@/interfaces';

interface MultipleSelectModalProps {
  selectedItems: string[];
  data: Option[];
  sheetRef: Ref<BottomSheetMethods>;
  onItemSelect: (value: string) => void;
}

export const MultipleSelectSheet = ({
  sheetRef,
  selectedItems,
  data,
  onItemSelect,
}: MultipleSelectModalProps) => {
  const { colors } = useTheme();
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const animatedIndex = useSharedValue(-1);

  const keyExtractor = useCallback((item: Option) => item.value.toString(), []);

  const renderItem = useCallback(
    ({ item, index }: { item: Option; index: number }) => {
      const isLastItem = index === data.length - 1;

      return (
        <OptionItem
          selectedItems={selectedItems}
          onItemSelect={onItemSelect}
          isLastItem={isLastItem}
          value={item.value}
          label={item.label}
        />
      );
    },
    [data.length, onItemSelect, selectedItems],
  );

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animatedIndex.value,
      [-1, 0, 1],
      [0, 1, 1],
      Extrapolation.CLAMP,
    );

    return {
      opacity,
      transform: [
        {
          translateY: interpolate(
            animatedIndex.value,
            [-1, 0, 1],
            [50, 0, 0],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  }, []);

  return (
    <Portal>
      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        animatedIndex={animatedIndex}
        enableDynamicSizing={false}
        backdropComponent={SheetBackDrop}
        backgroundStyle={{ backgroundColor: colors.bottomSheet.background }}
      >
        <Animated.View style={animatedStyle}>
          <BottomSheetFlatList
            data={data}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            contentContainerStyle={modalStyles.contentContainerStyle}
          />
        </Animated.View>
      </BottomSheet>
    </Portal>
  );
};
