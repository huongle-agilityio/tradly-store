import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import { Login, Welcome } from '@/screens';

// Constants
import { SCREENS } from '@/constants';

// Interfaces
import { PublicStackParamList } from '@/interfaces';

const Stack = createNativeStackNavigator<PublicStackParamList>();

interface PublicNavigationProps {
  isFirstLogin: boolean;
}

export const PublicNavigation = ({ isFirstLogin }: PublicNavigationProps) => (
  <Stack.Navigator
    initialRouteName={isFirstLogin ? SCREENS.ONBOARDING : SCREENS.LOGIN}
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name={SCREENS.LOGIN} component={Login} />
    <Stack.Screen name={SCREENS.ONBOARDING} component={Welcome} />
  </Stack.Navigator>
);
