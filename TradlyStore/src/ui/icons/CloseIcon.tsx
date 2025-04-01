import Svg, { Path } from 'react-native-svg';
import { SvgFactoryProps } from './SvgFactory';

// Themes
import { colors } from '@/ui/themes';

export const CloseIcon = ({
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
    viewBox="0 0 16 17"
    style={style}
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.1793 16.5965C13.6988 17.1325 14.0368 17.138 14.5658 16.5965L15.6048 15.5325C16.1138 15.0115 16.1483 14.6695 15.6048 14.113L10.1223 8.50049L15.6053 2.88799C16.1188 2.36049 16.1288 2.00449 15.6053 1.46799L14.5663 0.404494C14.0273 -0.147506 13.6943 -0.122006 13.1798 0.404494L8.00082 5.70649L2.82232 0.404994C2.30782 -0.121506 1.97482 -0.147006 1.43582 0.404994L0.396825 1.46849C-0.127175 2.00499 -0.117676 2.36099 0.396825 2.88849L5.87932 8.50049L0.396825 14.113C-0.146675 14.6695 -0.117676 15.0115 0.396825 15.5325L1.43532 16.5965C1.95982 17.138 2.29782 17.1325 2.82182 16.5965L8.00082 11.2945L13.1793 16.5965Z"
      fill="white"
    />
  </Svg>
);
