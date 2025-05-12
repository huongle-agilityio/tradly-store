import { memo, ReactNode, useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

// Components
import { Button } from '@/components/common';

// Themes
import { spacing } from '@/themes';

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
  }: StickyFooterProps) => {
    const { colors } = useTheme();

    const stylesDynamic = useMemo(
      () =>
        StyleSheet.create({
          wrapper: {
            width: '100%',
            borderTopWidth: 0.5,
            borderColor: colors.productCard.border,
          },
          content: {
            backgroundColor: colors.backgroundSecondary,
            paddingVertical: spacing[3],
            paddingHorizontal: 32,
          },
        }),
      [colors],
    );

    return (
      <View style={styles.container}>
        <View style={styles.container}>{children}</View>
        <View style={stylesDynamic.wrapper}>
          <View style={stylesDynamic.content}>
            {Content}
            <Button
              disabled={disabled}
              isLoading={isLoading}
              textSize="xl"
              color="secondary"
              buttonStyles={styles.button}
              onPress={onPress}
            >
              {buttonText}
            </Button>
          </View>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: { height: 48 },
});
