import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Storybook from '../../.storybook';

function HomeScreen() {
  return (
    <View style={styles.container}>
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
