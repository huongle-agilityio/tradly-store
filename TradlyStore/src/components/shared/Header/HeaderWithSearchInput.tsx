import { memo, useEffect, useMemo, useState } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Components
import { HeaderFilter } from './HeaderFilter';
import { Input, Text } from '@/components/common';

// Icons
import { CartIcon, HeartIcon, SearchIcon } from '@/components/icons';

// Hooks
import { useDebounce } from '@/hooks';

// Interfaces
import { AppParamList } from '@/interfaces';

// Stores
import { useCartStore } from '@/stores';

// Constants
import { SCREENS, TIMING } from '@/constants';

// Themes
import { radius, spacing } from '@/themes';

interface HeaderWithSearchInputProps {
  title: string;
  hasFilter?: boolean;
  hasSearchInput?: boolean;
}

export const HeaderWithSearchInput = memo(
  ({
    hasFilter = false,
    hasSearchInput = true,
    title,
  }: HeaderWithSearchInputProps) => {
    const { colors } = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<AppParamList>>();
    const [filter, setFilter] = useState<string>('');
    const debouncedSearchTerm = useDebounce(filter, TIMING.DEBOUNCE_DEFAULT);
    const carts = useCartStore((state) => state.carts);

    const stylesDynamic = useMemo(
      () =>
        StyleSheet.create({
          container: {
            backgroundColor: colors.primary,
          },
          cartDot: {
            backgroundColor: colors.dotNotification,
          },
        }),
      [colors.primary, colors.dotNotification],
    );

    const handleFilter = (value: string) => {
      setFilter(value);
    };

    const handleRedirectBrowse = () => {
      if (hasFilter) return;

      navigation.navigate(SCREENS.TABS, {
        screen: SCREENS.BROWSE,
      });
    };

    const handlerRedirectMyCart = () => {
      navigation.navigate(SCREENS.CART, { screen: SCREENS.SHOPPING_CART });
    };

    useEffect(() => {
      navigation.setParams({
        title: debouncedSearchTerm,
      });
    }, [debouncedSearchTerm, navigation]);

    return (
      <View style={[styles.container, stylesDynamic.container]}>
        <View style={styles.headerWrapper}>
          <Text fontSize="xxl" fontWeight="bold" color="light">
            {title}
          </Text>
          <View style={styles.iconWrapper}>
            <HeartIcon size={24} color={colors.light} />
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Button to navigate to cart screen"
              onPress={handlerRedirectMyCart}
              style={{ position: 'relative', opacity: carts.length ? 1 : 0.7 }}
              disabled={!carts.length}
            >
              <CartIcon size={24} color={colors.light} />
              {!!carts.length && (
                <View style={[styles.cartDot, stylesDynamic.cartDot]} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {hasSearchInput && (
          <View style={styles.inputWrapper}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Input navigate to browse tab"
              onPress={handleRedirectBrowse}
            >
              <Input
                variant="outlined"
                placeholder="Search Product"
                onChangeText={handleFilter}
                editable={!!hasFilter}
                value={filter}
                icon={<SearchIcon size={24} color={colors.primary} />}
              />
            </TouchableOpacity>
          </View>
        )}

        {hasFilter && <HeaderFilter />}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing[5],
    paddingHorizontal: spacing[4],
  },
  headerWrapper: {
    paddingBottom: 23,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconWrapper: { flexDirection: 'row', gap: spacing[5] },
  inputWrapper: { paddingBottom: spacing[4] },
  cartDot: {
    width: spacing['3.5'],
    height: spacing['3.5'],
    borderRadius: radius.full,
    position: 'absolute',
    right: -6,
    top: -2,
  },
});
