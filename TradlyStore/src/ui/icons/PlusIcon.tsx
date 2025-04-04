import Svg, { Path } from 'react-native-svg';
import { SvgFactoryProps } from './SvgFactory';

// Themes
import { colors } from '@/ui/themes';

export const PlusIcon = ({
  width,
  height,
  size = 19,
  color = colors.productCard.textSecondary,
  ...props
}: SvgFactoryProps) => (
  <Svg
    width={width || size}
    height={height || size}
    color={color}
    viewBox="0 0 19 19"
    {...props}
  >
    <Path
      d="M10.8516 10.8443V19H8.1763V10.8443H0.277832V8.20047H8.1763V0H10.8516V8.20047H18.7501V10.8443H10.8516Z"
      fill="currentColor"
      fillOpacity={0.2}
    />
  </Svg>
);
