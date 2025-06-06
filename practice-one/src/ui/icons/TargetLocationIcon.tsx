import Svg, { G, Mask, Path, Rect } from 'react-native-svg';
import { SvgFactoryProps } from './SvgFactory';

// Themes
import { colors, spacing } from '@/ui/themes';

export const TargetLocationIcon = ({
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
    viewBox="0 0 24 24"
    {...props}
  >
    <Mask
      id="mask0_0_2284"
      style={{
        maskType: 'luminance',
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={24}
      height={24}
    >
      <Rect width={24} height={24} fill="white" />
    </Mask>
    <G mask="url(#mask0_0_2284)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16Z"
        fill="currentColor"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 2H11V4.069C9.2403 4.29368 7.60497 5.09617 6.35057 6.35057C5.09617 7.60497 4.29368 9.2403 4.069 11H2V13H4.069C4.29335 14.7598 5.09574 16.3953 6.3502 17.6498C7.60466 18.9043 9.24017 19.7066 11 19.931V22H13V19.931C14.7599 19.7068 16.3955 18.9045 17.65 17.65C18.9045 16.3955 19.7068 14.7599 19.931 13H22V11H19.931C19.7066 9.24017 18.9043 7.60466 17.6498 6.3502C16.3953 5.09574 14.7598 4.29335 13 4.069V2ZM6 12C6 8.691 8.691 6 12 6C15.309 6 18 8.691 18 12C18 15.309 15.309 18 12 18C8.691 18 6 15.309 6 12Z"
        fill="currentColor"
      />
    </G>
  </Svg>
);
