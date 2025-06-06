import Svg, { Path } from 'react-native-svg';
import { SvgFactoryProps } from './SvgFactory';

// Themes
import { colors } from '@/themes';

export const EditIcon = ({
  width,
  height,
  size = 16,
  color = colors.light,
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
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.64 14.48C0.286 14.48 0 14.766 0 15.12V15.84C0 15.928 0.072 16 0.16 16H15.84C15.928 16 16 15.928 16 15.84V15.12C16 14.766 15.714 14.48 15.36 14.48H0.64ZM3.034 12.79L6.398 12.2C6.438 12.192 6.476 12.174 6.504 12.144L14.982 3.666C15.0005 3.6475 15.0153 3.62552 15.0253 3.60133C15.0353 3.57713 15.0405 3.55119 15.0405 3.525C15.0405 3.49881 15.0353 3.47287 15.0253 3.44867C15.0153 3.42448 15.0005 3.4025 14.982 3.384L11.658 0.058C11.62 0.02 11.57 0 11.516 0C11.462 0 11.412 0.02 11.374 0.058L2.896 8.536C2.866 8.566 2.848 8.602 2.84 8.642L2.25 12.006C2.23054 12.1131 2.2375 12.2234 2.27025 12.3273C2.30301 12.4311 2.36059 12.5254 2.438 12.602C2.57 12.73 2.736 12.8 2.914 12.8C2.954 12.8 2.994 12.796 3.034 12.79Z"
      fill="currentColor"
    />
  </Svg>
);
