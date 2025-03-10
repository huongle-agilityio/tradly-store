import { router } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

// Components
import { Text } from '@/ui/components';

// Icons
import { ArrowLeftIcon } from '@/ui/icons';

// Themes
import { colors, spacing } from '@/ui/themes';
import { ReactNode } from 'react';

interface HeaderWithFilterButtonProps {
  title: string;
  hasBackButton?: boolean;
  children?: ReactNode;
}

export const HeaderWithTitle = ({
  hasBackButton = false,
  title,
  children,
}: HeaderWithFilterButtonProps) => {
  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View
        style={[styles.titleWrapper, hasBackButton && { alignItems: 'center' }]}
      >
        {hasBackButton && (
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeftIcon size={24} color={colors.light} />
          </TouchableOpacity>
        )}

        <Text fontSize="xxl" fontWeight="bold" color="light">
          {title}
        </Text>
      </View>

      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: colors.primary, paddingHorizontal: 16 },
  titleWrapper: {
    paddingTop: spacing['2.5'],
    paddingBottom: 23,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: spacing[0],
    top: 13,
  },
});
