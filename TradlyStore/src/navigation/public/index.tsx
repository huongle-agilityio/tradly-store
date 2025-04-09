import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import { Login, Onboarding } from '@/ui/screens';

// Constants
import { SCREENS } from '@/constants';

// Interfaces
import { PublicStackParamList } from '@/interfaces';

const Stack = createNativeStackNavigator<PublicStackParamList>();

interface PublicNavigationProps {
  initScreen: typeof SCREENS.LOGIN | typeof SCREENS.ONBOARDING;
}

export const PublicNavigation = ({ initScreen }: PublicNavigationProps) => (
  <Stack.Navigator
    initialRouteName={initScreen}
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name={SCREENS.LOGIN} component={Login} />
    <Stack.Screen name={SCREENS.ONBOARDING} component={Onboarding} />
  </Stack.Navigator>
);
