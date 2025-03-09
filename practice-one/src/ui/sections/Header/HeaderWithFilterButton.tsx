import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

// Components
import { Button, Input, Text } from '@/ui/components';

// Icons
import {
  ArrowLeftIcon,
  CategoryIcon,
  LocationIcon,
  SearchIcon,
  SortIcon,
} from '@/ui/icons';

// Constants
import { TIMING } from '@/constants';

// Hooks
import { useDebounce } from '@/hooks';

// Themes
import { colors, spacing } from '@/ui/themes';

export const HeaderWithFilterButton = ({ title }: { title: string }) => {
  const [filter, setFilter] = useState<string>('');
  const debouncedSearchTerm = useDebounce(filter, TIMING.DEBOUNCE_DEFAULT);

  const handleBack = () => {
    router.back();
  };

  const handleFilter = (value: string) => {
    setFilter(value);
  };

  useEffect(() => {
    router.setParams({
      title: debouncedSearchTerm,
    });
  }, [debouncedSearchTerm]);

  return (
    <View style={{ backgroundColor: colors.primary, paddingHorizontal: 16 }}>
      <View style={styles.headerWrapper}>
        <ArrowLeftIcon
          size={24}
          color={colors.light}
          style={styles.backButton}
          onPress={handleBack}
        />
        <Text fontSize="xxl" fontWeight="bold" color="light">
          {title}
        </Text>
      </View>
      <View style={{ marginTop: 37 }}>
        <Input
          variant="outlined"
          placeholder="Search Product"
          onChangeText={handleFilter}
          value={filter}
          icon={<SearchIcon size={24} color={colors.primary} />}
        />
      </View>
      <View style={styles.buttonFilterWrapper}>
        <Button
          variant="bordered"
          color="secondary"
          icon={<SortIcon size={16} color={colors.light} />}
        >
          Sort by
        </Button>
        <Button
          variant="bordered"
          color="secondary"
          icon={<LocationIcon size={16} color={colors.light} />}
        >
          Location
        </Button>
        <Button
          variant="bordered"
          color="secondary"
          icon={<CategoryIcon size={16} color={colors.light} />}
        >
          Category
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    alignItems: 'center',
    paddingTop: spacing['2.5'],
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: spacing[0],
    bottom: spacing['0.5'],
  },
  buttonFilterWrapper: {
    flexDirection: 'row',
    gap: spacing[2],
    paddingTop: 28,
    paddingBottom: spacing[3],
  },
});
