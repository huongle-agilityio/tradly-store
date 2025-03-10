import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

// Components
import { Text } from '@/ui/components';
import { HeaderFilter } from '../HeaderFilter';

// Icons
import { ArrowLeftIcon } from '@/ui/icons';

// Themes
import { colors, spacing } from '@/ui/themes';

interface HeaderWithFilterButtonProps {
  title: string;
}

export const HeaderWithFilterButton = ({
  title,
}: HeaderWithFilterButtonProps) => {
  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
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

      <HeaderFilter />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: colors.primary, paddingHorizontal: 16 },
  titleWrapper: {
    alignItems: 'center',
    paddingTop: spacing['2.5'],
    paddingBottom: 23,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: spacing[0],
    top: spacing[3],
  },
});
