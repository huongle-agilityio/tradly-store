import { ComponentProps, memo } from 'react';
import { Asset } from 'expo-asset';
import { StyleProp } from 'react-native';
import { Image as ExpoImage, ImageStyle } from 'expo-image';

// Constants
import { IMAGES } from '@/constants';

interface ImageProps extends Omit<ComponentProps<typeof ExpoImage>, 'source'> {
  source: string | Asset;
  alt: string;
  styles?: StyleProp<ImageStyle>;
}

export const Image = memo(({ source, alt, styles, ...props }: ImageProps) => (
  <ExpoImage
    source={source}
    style={[styles]}
    placeholder={{ blurhash: IMAGES.BLUR_HASH }}
    alt={alt}
    transition={1000}
    {...props}
  />
));

Image.displayName = 'Image';
