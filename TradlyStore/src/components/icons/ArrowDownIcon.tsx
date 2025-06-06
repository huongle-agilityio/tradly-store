import Svg, { Path } from 'react-native-svg';
import { SvgFactoryProps } from './SvgFactory';

// Themes
import { colors, spacing } from '@/themes';

export const ArrowDownIcon = ({
  width = 9,
  height = spacing[1],
  size,
  color = colors.placeholder,
  ...props
}: SvgFactoryProps) => (
  <Svg
    width={width || size}
    height={height || size}
    color={color}
    viewBox="0 0 9 4"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.47396 0C8.65786 0 8.74428 0.227303 8.60683 0.349482L4.63287 3.88189C4.5571 3.94925 4.4429 3.94925 4.36713 3.88189L0.393167 0.349482C0.255716 0.227303 0.342136 0 0.52604 0H8.47396Z"
      fill="currentColor"
    />
  </Svg>
);
