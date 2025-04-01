import { ReactNode } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

// Components
import { Text } from '@/ui/components';

// Icons
import { ArrowLeftIcon, CloseIcon } from '@/ui/icons';

// Themes
import { colors, spacing } from '@/ui/themes';

interface HeaderWithFilterButtonProps {
  title: string;
  children?: ReactNode;
  onBack?: () => void;
  onClose?: () => void;
}

export const HeaderWithTitle = ({
  title,
  children,
  onBack,
  onClose,
}: HeaderWithFilterButtonProps) => (
  <View style={styles.container}>
    <View style={[styles.titleWrapper, onBack && styles.hasBackButton]}>
      {onBack && (
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowLeftIcon size={24} color={colors.light} />
        </TouchableOpacity>
      )}

      <Text fontSize="xxl" fontWeight="bold" color="light">
        {title}
      </Text>

      {onClose && (
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <CloseIcon size={16} color={colors.light} />
        </TouchableOpacity>
      )}
    </View>

    {children}
  </View>
);

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
  closeButton: {
    position: 'absolute',
    right: spacing[0],
    top: 18,
  },
  hasBackButton: { alignItems: 'center' },
});
