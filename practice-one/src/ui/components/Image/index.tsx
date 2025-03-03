import { ComponentProps } from 'react';
import { StyleProp } from 'react-native';
import { Image as ExpoImage, ImageStyle } from 'expo-image';

// Constants
import { IMAGES } from '@/constants';

interface ImageProps extends Omit<ComponentProps<typeof ExpoImage>, 'source'> {
  source: string;
  alt: string;
  styles?: StyleProp<ImageStyle>;
}

export const Image = ({ source, alt, styles, ...props }: ImageProps) => (
  <ExpoImage
    source={source}
    style={[styles]}
    placeholder={{ blurhash: IMAGES.BLUR_HASH }}
    contentFit="cover"
    alt={alt}
    transition={1000}
    {...props}
  />
);
