import Svg, { Circle, ClipPath, Defs, G, Rect } from 'react-native-svg';
import { SvgFactoryProps } from './SvgFactory';

// Themes
import { colors } from '@/ui/themes';

export const MenuDotIcon = ({
  width,
  height,
  size,
  color = colors.placeholder,
  ...props
}: SvgFactoryProps) => (
  <Svg
    width={width || size}
    height={height || size}
    color={color}
    viewBox="0 0 4 18"
    fill="none"
    {...props}
  >
    <G clipPath="url(#clip0_0_156)">
      <Circle cx={2} cy={2} r={2} fill="white" />
      <Circle cx={2} cy={9} r={2} fill="white" />
      <Circle cx={2} cy={16} r={2} fill="white" />
    </G>
    <Defs>
      <ClipPath id="clip0_0_156">
        <Rect width={4} height={18} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
