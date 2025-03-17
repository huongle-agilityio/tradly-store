import { useEffect, useState } from 'react';
import { Href, router } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

// Components
import { HeaderFilter } from '../HeaderFilter';
import { Input, Text } from '@/ui/components';

// Icons
import { CartIcon, HeartIcon, SearchIcon } from '@/ui/icons';

// Hooks
import { useDebounce } from '@/hooks';

// Stores
import { useCartStore } from '@/stores';

// Constants
import { SCREEN_ROUTES, TIMING } from '@/constants';

// Themes
import { colors, radius, spacing } from '@/ui/themes';

interface HeaderWithSearchInputProps {
  hasFilter?: boolean;
  title: string;
}

export const HeaderWithSearchInput = ({
  hasFilter = false,
  title,
}: HeaderWithSearchInputProps) => {
  const [filter, setFilter] = useState<string>('');
  const debouncedSearchTerm = useDebounce(filter, TIMING.DEBOUNCE_DEFAULT);
  const carts = useCartStore((state) => state.carts);

  const handleFilter = (value: string) => {
    setFilter(value);
  };

  const handleRedirectBrowse = () => {
    if (hasFilter) return;

    router.replace({
      pathname: SCREEN_ROUTES.BROWSE,
    });
  };

  const handlerRedirectMyCart = () => {
    router.push(SCREEN_ROUTES.CART as Href);
  };

  useEffect(() => {
    router.setParams({
      title: debouncedSearchTerm,
    });
  }, [debouncedSearchTerm]);

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text fontSize="xxl" fontWeight="bold" color="light">
          {title}
        </Text>
        <View style={styles.iconWrapper}>
          <HeartIcon size={24} color={colors.light} />
          <TouchableOpacity
            onPress={handlerRedirectMyCart}
            style={{ position: 'relative', opacity: carts.length ? 1 : 0.7 }}
            disabled={!carts.length}
          >
            <CartIcon size={24} color={colors.light} />
            {!!carts.length && <View style={styles.cartDot} />}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputWrapper}>
        <TouchableOpacity onPress={handleRedirectBrowse}>
          <Input
            variant="outlined"
            placeholder="Search Product"
            onChangeText={handleFilter}
            editable={!!hasFilter}
            onPress={handleRedirectBrowse}
            value={filter}
            icon={<SearchIcon size={24} color={colors.primary} />}
          />
        </TouchableOpacity>
      </View>

      {hasFilter && <HeaderFilter />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing[5],
    paddingHorizontal: spacing[4],
    backgroundColor: colors.primary,
  },
  headerWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconWrapper: { flexDirection: 'row', gap: spacing[5] },
  inputWrapper: { paddingTop: 23, paddingBottom: spacing[4] },
  cartDot: {
    width: spacing['3.5'],
    height: spacing['3.5'],
    borderRadius: radius.full,
    backgroundColor: colors.dotNotification,
    position: 'absolute',
    right: -6,
    top: -2,
  },
});
