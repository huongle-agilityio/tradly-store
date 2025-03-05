import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Storybook from '../../../.storybook';
import { ProductCarousel } from '@/ui/components';

function HomeScreen() {
  const images = [
    'https://picsum.photos/seed/696/3000/2000',
    'https://picsum.photos/seed/696/3000/2000',
    'https://picsum.photos/seed/696/3000/2000',
    'https://picsum.photos/seed/696/3000/2000',
    'https://picsum.photos/seed/696/3000/2000',
  ];

  return (
    <View style={styles.container}>
      <View style={{ width: '100%', height: 200 }}>
        <ProductCarousel images={images} name="Beverages" />
      </View>
      <Text>Home2</Text>
    </View>
  );
}

export default Constants.expoConfig?.extra?.storybookEnabled
  ? Storybook
  : HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
