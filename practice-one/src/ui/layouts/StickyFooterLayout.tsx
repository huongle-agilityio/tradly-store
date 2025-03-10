import { memo, ReactNode } from 'react';
import { View } from 'react-native';

// Components
import { Button } from '@/ui/components';

// Themes
import { colors, spacing } from '../themes';

interface StickyFooterLayoutProps {
  buttonText: string;
  disabled?: boolean;
  isLoading?: boolean;
  children: ReactNode;
  onPress: () => void;
}

export const StickyFooterLayout = memo(
  ({
    disabled,
    isLoading,
    buttonText,
    onPress,
    children,
  }: StickyFooterLayoutProps) => (
    <View style={{ flex: 1, position: 'relative' }}>
      <View style={{ flex: 1 }}>{children}</View>
      <View
        style={{
          paddingVertical: spacing[3],
          paddingHorizontal: 32,
          width: '100%',
          backgroundColor: colors.light,
          bottom: 0,
          position: 'absolute',
        }}
      >
        <Button
          disabled={disabled}
          isLoading={isLoading}
          textSize="xl"
          buttonStyles={{ height: 48 }}
          onPress={onPress}
        >
          {buttonText}
        </Button>
      </View>
    </View>
  ),
);

StickyFooterLayout.displayName = 'StickyFooterLayout';
