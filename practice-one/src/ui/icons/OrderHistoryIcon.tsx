import Svg, { Path } from 'react-native-svg';
import { SvgFactoryProps } from './SvgFactory';

// Themes
import { colors, spacing } from '@/ui/themes';

export const OrderHistoryIcon = ({
  width,
  height,
  size = spacing[5],
  color = colors.placeholder,
  ...props
}: SvgFactoryProps) => (
  <Svg
    width={width || size}
    height={height || size}
    color={color}
    viewBox="0 0 16 20"
    {...props}
  >
    <Path
      fill="currentColor"
      fillRule="evenodd"
      d="M13 0a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h10ZM3.293 7.293A1 1 0 0 0 4 9h8a1 1 0 1 0 0-2H4a1 1 0 0 0-.707.293Zm0 8A1 1 0 0 0 4 17h5a1 1 0 0 0 0-2H4a1 1 0 0 0-.707.293Zm0-12A1 1 0 0 0 4 5h8a1 1 0 1 0 0-2H4a1 1 0 0 0-.707.293Zm0 8A1 1 0 0 0 4 13h8a1 1 0 0 0 0-2H4a1 1 0 0 0-.707.293Z"
      clipRule="evenodd"
    />
  </Svg>
);
