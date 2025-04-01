import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import { Login, Onboarding } from '@/ui/screens';

// Constants
import { SCREENS } from '@/constants';

// Interfaces
import { PublicStackParamList } from '@/interfaces';

const Stack = createNativeStackNavigator<PublicStackParamList>();

export const PublicNavigation = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={SCREENS.ONBOARDING} component={Onboarding} />
    <Stack.Screen name={SCREENS.LOGIN} component={Login} />
  </Stack.Navigator>
);
