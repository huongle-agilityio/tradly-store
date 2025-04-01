import { Image, View } from 'react-native';
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

  return (
    <View style={styles.container}>
      <Image
        source={IMAGE_DETAILS.UPCOMING.src}
        alt={IMAGE_DETAILS.UPCOMING.alt}
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
    </View>
  );
};
