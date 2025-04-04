import Svg, { Path } from 'react-native-svg';
import { SvgFactoryProps } from './SvgFactory';

// Themes
import { colors } from '@/ui/themes';

export const TrashIcon = ({
  width = 14,
  height = 15,
  size,
  color = colors.light,
  ...props
}: SvgFactoryProps) => (
  <Svg
    width={width || size}
    height={height || size}
    color={color}
    viewBox="0 0 14 15"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.0833 2.7V1.2C11.0833 0.538125 10.5602 0 9.91667 0H4.08333C3.43984 0 2.91667 0.538125 2.91667 1.2V2.7H0.583333C0.260677 2.7 0 2.96812 0 3.3V3.9C0 3.9825 0.065625 4.05 0.145833 4.05H1.24687L1.69714 13.8562C1.7263 14.4956 2.24036 15 2.86198 15H11.138C11.7615 15 12.2737 14.4975 12.3029 13.8562L12.7531 4.05H13.8542C13.9344 4.05 14 3.9825 14 3.9V3.3C14 2.96812 13.7393 2.7 13.4167 2.7H11.0833ZM4.22917 2.7V1.35H9.77083V2.7H4.22917Z"
      fill="currentColor"
    />
  </Svg>
);
