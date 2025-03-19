import { ActivityIndicator, View } from 'react-native';
import { useAssets } from 'expo-asset';
import { Image } from 'expo-image';
import { styles } from './styles';

// Components
import { Text } from '@/ui/components';

// Constants
import { IMAGE_DETAILS } from '@/constants';

// Hooks
import { useMedia } from '@/hooks';

// Themes
import { lineHeights } from '@/ui/themes';

export const UpComing = () => {
  const { width } = useMedia();
  const [assets] = useAssets([IMAGE_DETAILS.UPCOMING.src]);

  return (
    <View style={styles.container}>
      {assets ? (
        <>
          <Image
            source={IMAGE_DETAILS.UPCOMING.src}
            alt={IMAGE_DETAILS.UPCOMING.alt}
            contentFit="contain"
            style={{
              width: width * 0.8,
              aspectRatio: 16 / 9,
            }}
          />
          <Text
            fontSize="lg"
            fontWeight="medium"
            textStyle={{ lineHeight: lineHeights.md }}
          >
            Upcoming Feature
          </Text>
        </>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};
