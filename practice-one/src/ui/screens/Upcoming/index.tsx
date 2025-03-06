import { View } from 'react-native';
import { Image } from 'expo-image';

// Components
import { Text } from '@/ui/components';

// Themes
import { lineHeights, spacing } from '@/ui/themes';

export const UpComing = () => (
  <View
    style={{
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      gap: spacing['2.5'],
    }}
  >
    <Image
      source={require('@/assets/working-team.png')}
      alt="Illustration of people collaborating around a large digital tablet with text, laptops, and a trophy."
      style={{ width: 250, height: 250 }}
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
