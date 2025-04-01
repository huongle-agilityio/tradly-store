import Svg, { Path } from 'react-native-svg';
import { SvgFactoryProps } from './SvgFactory';

// Themes
import { colors } from '@/ui/themes';

export const ShareIcon = ({
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
    viewBox="0 0 16 16"
    {...props}
  >
    <Path
      d="M15.5 13C15.5 14.66 14.16 16 12.5 16C10.84 16 9.5 14.66 9.5 13C9.5 12.76 9.53 12.54 9.59 12.31L5.21 10.01C4.66 10.62 3.88 11 3 11C1.34 11 0 9.66 0 8C0 6.34 1.34 5 3 5C3.88 5 4.66 5.39 5.21 5.99L9.59 3.69C9.53 3.46 9.5 3.24 9.5 3C9.5 1.34 10.84 0 12.5 0C14.16 0 15.5 1.34 15.5 3C15.5 4.66 14.16 6 12.5 6C11.62 6 10.84 5.61 10.29 5.01L5.91 7.31C6.03112 7.76203 6.03112 8.23797 5.91 8.69L10.29 10.99C10.84 10.38 11.62 10 12.5 10C14.16 10 15.5 11.34 15.5 13Z"
      fill="currentColor"
    />
  </Svg>
);
