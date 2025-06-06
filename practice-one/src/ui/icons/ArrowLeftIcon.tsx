import Svg, { Path } from 'react-native-svg';
import { SvgFactoryProps } from './SvgFactory';

// Themes
import { colors } from '@/ui/themes';

export const ArrowLeftIcon = ({
  width,
  height,
  size,
  color = colors.placeholder,
  style,
  ...props
}: SvgFactoryProps) => (
  <Svg
    width={width || size}
    height={height || size}
    color={color}
    viewBox="0 0 19 16"
    style={style}
    {...props}
  >
    <Path
      d="M3.828 6.707L9.121 1.414L7.707 0L0 7.707L7.707 15.414L9.121 14L3.828 8.707H18.414V6.707H3.828Z"
      fill="currentColor"
    />
  </Svg>
);
