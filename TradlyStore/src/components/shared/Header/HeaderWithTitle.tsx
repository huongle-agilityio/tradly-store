import { memo, ReactNode, useMemo } from 'react';
import { ParamListBase, useTheme } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// Components
import { Text } from '@/components/common';

// Icons
import { ArrowLeftIcon, CloseIcon } from '@/components/icons';

// Themes
import { spacing } from '@/themes';

interface HeaderWithFilterButtonProps {
  title: string;
  children?: ReactNode;
  navigation?: NativeStackNavigationProp<ParamListBase, string, undefined>;
  onClose?: () => void;
}

export const HeaderWithTitle = memo(
  ({ navigation, title, children, onClose }: HeaderWithFilterButtonProps) => {
    const { colors } = useTheme();

    const stylesDynamic = useMemo(
      () =>
        StyleSheet.create({
          container: { backgroundColor: colors.primary, paddingHorizontal: 16 },
        }),
      [colors.primary],
    );

    const handleBack = () => {
      navigation?.goBack();
    };

    return (
      <View style={stylesDynamic.container}>
        <View style={[styles.titleWrapper, navigation && styles.hasBackButton]}>
          {navigation && (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Button to go previous screen"
              onPress={handleBack}
              style={styles.backButton}
            >
              <ArrowLeftIcon size={24} color={colors.light} />
            </TouchableOpacity>
          )}

          <Text fontSize="xxl" fontWeight="bold" color="light">
            {title}
          </Text>

          {onClose && (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Button close current screen"
              onPress={onClose}
              style={styles.closeButton}
            >
              <CloseIcon size={16} color={colors.light} />
            </TouchableOpacity>
          )}
        </View>

        {children}
      </View>
    );
  },
);

const styles = StyleSheet.create({
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
