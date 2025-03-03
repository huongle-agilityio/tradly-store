import Svg, { Path } from 'react-native-svg';
import { SvgFactoryProps } from './SvgFactory';

// Themes
import { colors, spacing } from '@/ui/themes';

export const SearchIcon = ({
  width,
  height,
  size = spacing[5],
  color = colors.placeholder,
}: SvgFactoryProps) => (
  <Svg
    width={width || size}
    height={height || size}
    color={color}
    viewBox="0 0 18 18"
  >
    <Path
      fill="currentColor"
      fillRule="evenodd"
      d="M0 8.111a8.111 8.111 0 1 1 16.222 0A8.111 8.111 0 0 1 0 8.111Zm14.222 0A6.111 6.111 0 1 0 2 8.111a6.111 6.111 0 0 0 12.222 0Z"
      clipRule="evenodd"
    />
    <Path
      fill="currentColor"
      d="M17.707 17.707a1 1 0 0 1-1.414 0l-3.867-3.867a1 1 0 0 1 1.414-1.414l3.867 3.867a1 1 0 0 1 0 1.414Z"
    />
  </Svg>
);
