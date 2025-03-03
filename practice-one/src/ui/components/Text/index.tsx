import { ReactNode } from 'react';
import { TextStyle, Text as BaseText, StyleProp } from 'react-native';
import { colors, fontSizes, fontWeights } from './styles';

type FontSizes =
  | 'xxs'
  | 'xs'
  | 'sm'
  | 'base'
  | 'md'
  | 'lg'
  | 'xl'
  | 'xxl'
  | 'xxxl';
type Colors =
  | 'default'
  | 'light'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'placeholder'
  | 'error'
  | 'success';
type FontWeight = 'light' | 'normal' | 'medium' | 'bold';

interface TextProps {
  color?: Colors;
  fontSize?: FontSizes;
  textStyle?: StyleProp<TextStyle>;
  fontWeight?: FontWeight;
  children: ReactNode;
}

const Text = ({
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
);

export default Text;
