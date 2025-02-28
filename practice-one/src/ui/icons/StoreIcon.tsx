import Svg, { Path } from 'react-native-svg';
import { SvgFactoryProps } from './SvgFactory';

// Themes
import { colors, spacing } from '@/ui/themes';

export const StoreIcon = ({
  width,
  height,
  size = spacing[5],
  color = colors.placeholder,
}: SvgFactoryProps) => (
  <Svg
    width={width || size}
    height={height || size}
    color={color}
    viewBox="0 0 24 24"
  >
    <Path
      fill="currentColor"
      fillRule="evenodd"
      d="M19.182.527A1.148 1.148 0 0 0 18.215 0H3.785c-.392 0-.76.2-.967.527L.5 4.17C-.696 6.05.364 8.666 2.6 8.965c.16.02.325.031.49.031a3.551 3.551 0 0 0 2.635-1.163 3.557 3.557 0 0 0 2.636 1.163 3.55 3.55 0 0 0 2.636-1.163 3.557 3.557 0 0 0 2.635 1.163 3.55 3.55 0 0 0 2.636-1.163 3.563 3.563 0 0 0 3.125 1.132C21.636 8.67 22.7 6.054 21.5 4.17L19.182.527Zm-1.325 9.464V13.5H4.143V9.991a4.8 4.8 0 0 1-1.054.134c-.214 0-.432-.014-.642-.042a4.546 4.546 0 0 1-.586-.127v6.919c0 .622.51 1.125 1.143 1.125h16c.632 0 1.143-.503 1.143-1.125V9.956a3.694 3.694 0 0 1-.586.127 5.049 5.049 0 0 1-.65.042c-.357 0-.71-.053-1.054-.134Z"
      clipRule="evenodd"
    />
  </Svg>
);
