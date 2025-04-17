import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import { Welcome } from '@/screens';

// Constants
import { SCREENS } from '@/constants';

// Interfaces
import { OnboardingStackParamList } from '@/interfaces';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export const OnboardingStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={SCREENS.WELCOME} component={Welcome} />
  </Stack.Navigator>
);
