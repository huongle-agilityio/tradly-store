import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

// Components
import { Button, Text } from '@/ui/components';

// Icons
import {
  ArrowLeftIcon,
  CategoryIcon,
  LocationIcon,
  SortIcon,
} from '@/ui/icons';

// Themes
import { colors, spacing } from '@/ui/themes';

export const HeaderWithFilterButton = ({ title }: { title: string }) => {
  const handleBack = () => {
    router.back();
  };

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
    paddingTop: 45,
    paddingBottom: spacing[3],
  },
});
