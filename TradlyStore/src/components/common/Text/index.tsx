import { memo, PropsWithChildren } from 'react';
import {
  TextStyle,
  Text as BaseText,
  StyleProp,
  TextProps as BaseTextProps,
} from 'react-native';
import { colors, fontSizes, fontWeights } from './styles';

// Interfaces
import { TextColor, TextSize, TextWeight } from '@/interfaces';

interface TextProps extends PropsWithChildren<BaseTextProps> {
  color?: TextColor;
  fontSize?: TextSize;
  textStyle?: StyleProp<TextStyle>;
  fontWeight?: TextWeight;
}

export const Text = memo(
  ({
    children,
    color = 'default',
    fontSize = 'base',
    fontWeight = 'normal',
    textStyle,
    ...props
  }: TextProps) => (
    <BaseText
      style={[
        fontSizes[fontSize],
        fontWeights[fontWeight],
        colors[color],
        textStyle && textStyle,
      ]}
      {...props}
    >
      {children}
    </BaseText>
  ),
);
