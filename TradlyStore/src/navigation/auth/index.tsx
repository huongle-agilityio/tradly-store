import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import { Login } from '@/screens';

// Constants
import { SCREENS } from '@/constants';

// Interfaces
import { AuthStackParamList } from '@/interfaces';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={SCREENS.LOGIN} component={Login} />
  </Stack.Navigator>
);
