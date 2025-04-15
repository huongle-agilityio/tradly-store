import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Components
import { Toast } from '@/ui/components';

// Navigation
import { PublicNavigation } from './public';
import { PrivateNavigation } from './private';
import { TabsNavigation } from './private/tabs';

// Constants
import { SCREENS } from '@/constants';

// Configs
import { linking } from '@/configs';

// Stores
import { useAuthStore, useToast } from '@/stores';

// Interfaces
import { AppParamList } from '@/interfaces';

// Themes
import { colors } from '@/ui/themes';

const App = createNativeStackNavigator<AppParamList>();

interface NavigationProps {
  isFirstLogin: boolean;
}

export const Navigation = ({ isFirstLogin }: NavigationProps) => {
  const queryClient = new QueryClient();

  // Stores
  const toast = useToast((state) => state.toast);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const PublicNavigateStack = () => (
    <PublicNavigation isFirstLogin={isFirstLogin} />
  );

  return (
    <KeyboardProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <NavigationContainer linking={linking}>
            <App.Navigator
              screenOptions={{
                headerShown: false,
                contentStyle: {
                  paddingTop: 50,
                  backgroundColor: colors.primary,
                },
              }}
            >
              {isAuthenticated ? (
                <App.Group>
                  <App.Screen name={SCREENS.TABS} component={TabsNavigation} />
                  <App.Screen
                    name={SCREENS.PRIVATE}
                    component={PrivateNavigation}
                  />
                </App.Group>
              ) : (
                <App.Screen
                  name={SCREENS.PUBLIC}
                  component={PublicNavigateStack}
                />
              )}
            </App.Navigator>

            <StatusBar barStyle="light-content" translucent />
            {toast?.description && (
              <Toast description={toast.description} variant={toast.variant} />
            )}
          </NavigationContainer>
        </SafeAreaProvider>
      </QueryClientProvider>
    </KeyboardProvider>
  );
};
