import { View, Button } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';

export const CrashlyticsTestButton = () => {
  const sendFakeError = () => {
    crashlytics().log('User clicked "Crash" button');
    crashlytics().crash();
  };

  return (
    <View style={{ marginTop: 100, padding: 20 }}>
      <Button title="Send Fake Error to Crashlytics" onPress={sendFakeError} />
    </View>
  );
};
