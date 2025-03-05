import Svg, { Path } from 'react-native-svg';
import { SvgFactoryProps } from './SvgFactory';

// Themes
import { colors, spacing } from '@/ui/themes';

export const HomeIcon = ({
  width,
  height,
  size = spacing[5],
  color = colors.placeholder,
}: SvgFactoryProps) => (
  <Svg
    width={width || size}
    height={height || size}
    color={color}
    viewBox="0 0 20 20"
  >
    <Path
      fill="currentColor"
      d="M13 15.065a3 3 0 0 0-6 0v5H2a2 2 0 0 1-2-2V7.197a2 2 0 0 1 .971-1.715l8-4.8a2 2 0 0 1 2.058 0l8 4.8A2 2 0 0 1 20 7.197v10.868a2 2 0 0 1-2 2h-5v-5Z"
    />
  </Svg>
);
