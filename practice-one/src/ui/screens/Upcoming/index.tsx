import { ActivityIndicator, View } from 'react-native';
import { useAssets } from 'expo-asset';
import { Image } from 'expo-image';
import { styles } from './styles';

// Components
import { Text } from '@/ui/components';

// Constants
import { IMAGE_DETAILS } from '@/constants';

// Themes
import { lineHeights } from '@/ui/themes';

export const UpComing = () => {
  const [assets] = useAssets([IMAGE_DETAILS.UPCOMING.src]);

  return (
    <View style={styles.container}>
      {assets ? (
        <>
          <Image
            source={IMAGE_DETAILS.UPCOMING.src}
            alt={IMAGE_DETAILS.UPCOMING.alt}
            style={{ minWidth: 250, minHeight: 250 }}
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
