import { memo, ReactNode, useEffect, useState } from 'react';
import { Keyboard, View } from 'react-native';

// Components
import { Button } from '@/ui/components';

// Themes
import { colors, spacing } from '../themes';

interface StickyFooterLayoutProps {
  buttonText: string;
  disabled?: boolean;
  isLoading?: boolean;
  children: ReactNode;
  content?: ReactNode;
  onPress: () => void;
}

export const StickyFooterLayout = memo(
  ({
    disabled,
    isLoading,
    buttonText,
    onPress,
    children,
    content: Content,
  }: StickyFooterLayoutProps) => {
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    const handleKeyboardShow = () => {
      setIsKeyboardVisible(true);
    };

    const handleKeyboardHide = () => {
      setIsKeyboardVisible(false);
    };

    useEffect(() => {
      const showSubscription = Keyboard.addListener(
        'keyboardDidShow',
        handleKeyboardShow,
      );
      const hideSubscription = Keyboard.addListener(
        'keyboardDidHide',
        handleKeyboardHide,
      );

      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }, []);

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>{children}</View>
        {!isKeyboardVisible && (
          <View
            style={{
              width: '100%',
              borderTopWidth: 0.5,
              borderColor: colors.productCard.border,
            }}
          >
            <View
              style={{
                backgroundColor: colors.light,
                paddingVertical: spacing[3],
                paddingHorizontal: 32,
              }}
            >
              {Content}
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
        )}
      </View>
    );
  },
);

StickyFooterLayout.displayName = 'StickyFooterLayout';
