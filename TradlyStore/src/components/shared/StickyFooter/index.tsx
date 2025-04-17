import { memo, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

// Components
import { Button } from '@/components/common';

// Themes
import { colors, spacing } from '@/themes';

interface StickyFooterProps {
  buttonText: string;
  disabled?: boolean;
  isLoading?: boolean;
  children: ReactNode;
  content?: ReactNode;
  onPress: () => void;
}

export const StickyFooter = memo(
  ({
    disabled,
    isLoading,
    buttonText,
    onPress,
    children,
    content: Content,
  }: StickyFooterProps) => (
    <View style={styles.container}>
      <View style={styles.container}>{children}</View>
      <View style={styles.wrapper}>
        <View style={styles.content}>
          {Content}
          <Button
            disabled={disabled}
            isLoading={isLoading}
            textSize="xl"
            buttonStyles={styles.button}
            onPress={onPress}
          >
            {buttonText}
          </Button>
        </View>
      </View>
    </View>
  ),
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    width: '100%',
    borderTopWidth: 0.5,
    borderColor: colors.productCard.border,
  },
  content: {
    backgroundColor: colors.light,
    paddingVertical: spacing[3],
    paddingHorizontal: 32,
  },
  button: { height: 48 },
});
