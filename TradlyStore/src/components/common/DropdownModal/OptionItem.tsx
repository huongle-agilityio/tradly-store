import { memo, useEffect, useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

// Components
import { Text } from '../Text';

// Icons
import { FillSuccessIcon } from '@/components/icons';

// Stores
import { useThemeStore } from '@/stores';

// Themes
import { radius } from '@/themes';

interface OptionItemProps {
  isLastItem: boolean;
  value: string;
  label: string;
  selectedItems: string[] | string;
  onItemSelect: (value: string) => void;
}

export const OptionItem = memo(
  ({
    selectedItems,
    onItemSelect,
    isLastItem,
    value,
    label,
  }: OptionItemProps) => {
    const { colors } = useTheme();
    const rotation = useSharedValue(0);
    const isDark = useThemeStore((store) => store.isDark);

    const stylesDynamic = useMemo(
      () =>
        StyleSheet.create({
          selectedText: {
            color: colors.success,
          },
          borderCommon: {
            borderBottomColor: colors.backgroundOpacity,
          },
          selectBox: {
            width: 20,
            height: 20,
            borderWidth: 1,
            borderRadius: radius.full,
            borderColor: colors.backgroundOpacity,
            justifyContent: 'center',
            alignItems: 'center',
          },
        }),
      [colors],
    );

    useEffect(() => {
      if (selectedItems.includes(value)) {
        rotation.value = withSequence(
          withTiming(-10, { duration: 50 }),
          withTiming(10, { duration: 50 }),
          withTiming(-6, { duration: 50 }),
          withTiming(6, { duration: 50 }),
          withTiming(0, { duration: 50 }),
        );
      }
    }, [rotation, selectedItems, value]);

    const animatedIconStyle = useAnimatedStyle(() => ({
      transform: [{ rotateZ: `${rotation.value}deg` }],
    }));

    const handleSelect = () => {
      onItemSelect(value);
    };

    return (
      <TouchableOpacity
        accessibilityRole="button"
        testID="option-item"
        style={[
          styles.item,
          ...(!isLastItem
            ? [styles.borderCommon, stylesDynamic.borderCommon]
            : []),
        ]}
        onPress={handleSelect}
      >
        <Text textStyle={styles.itemText}>{label}</Text>
        <View
          style={[
            stylesDynamic.selectBox,
            ...(selectedItems.includes(value)
              ? [{ borderColor: colors.transparent }]
              : []),
          ]}
        >
          {selectedItems.includes(value) && (
            <Animated.View style={animatedIconStyle}>
              <FillSuccessIcon
                width={20}
                height={20}
                color={isDark ? colors.light : colors.primary}
              />
            </Animated.View>
          )}
        </View>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  itemText: {
    fontSize: 16,
  },
  selectedText: {
    fontSize: 16,
  },
  borderCommon: {
    borderBottomWidth: 1,
  },
});
