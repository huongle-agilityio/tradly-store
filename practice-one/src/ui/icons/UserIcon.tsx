import Svg, { Path } from 'react-native-svg';
import { SvgFactoryProps } from './SvgFactory';

// Themes
import { colors, spacing } from '@/ui/themes';

export const UserIcon = ({
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
    viewBox="0 0 20 20"
    {...props}
  >
    <Path
      fill="currentColor"
      fillRule="evenodd"
      d="M15.625 5.625A5.626 5.626 0 0 0 10 0a5.626 5.626 0 0 0-5.625 5.625A5.626 5.626 0 0 0 10 11.25a5.626 5.626 0 0 0 5.625-5.625ZM12.848 12.5a6.808 6.808 0 0 1-5.696 0H5a5 5 0 0 0-5 5v.625C0 19.16.84 20 1.875 20h16.25C19.16 20 20 19.16 20 18.125V17.5a5 5 0 0 0-5-5h-2.152Z"
      clipRule="evenodd"
    />
  </Svg>
);
