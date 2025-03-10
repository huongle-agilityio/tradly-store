import { View } from 'react-native';
import { Image } from 'expo-image';
import { styles } from './styles';

// Components
import { Text } from '@/ui/components';

// Constants
import { IMAGE_DETAILS } from '@/constants';

// Themes
import { lineHeights } from '@/ui/themes';

export const UpComing = () => (
  <View style={styles.container}>
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
  </View>
);
