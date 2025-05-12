import { StatusBar } from 'react-native';
import { PortalProvider } from '@gorhom/portal';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Components
import { Toast } from '@/components/common';

// Navigation
import { TabsStack } from './tabs';
import { AuthStack } from './auth';
import { CartStack } from './cart';
import { OrderStack } from './order';
import { ProductStack } from './product';
import { OnboardingStack } from './onboarding';

// Constants
import { SCREENS } from '@/constants';

// Configs
import { linking } from '@/configs';

// Stores
import { useAuthStore, useToast, useIniStore, useThemeStore } from '@/stores';

// Interfaces
import { AppParamList } from '@/interfaces';

// Themes
import { colors, darkColors } from '@/themes';

const App = createNativeStackNavigator<AppParamList>();

export const Navigation = () => {
  const queryClient = new QueryClient();

  // Stores
  const theme = useThemeStore((state) => state.appScheme ?? state.systemScheme);
  const toast = useToast((state) => state.toast);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isFirstLogin = useIniStore((state) => state.isFirstLogin);

  const customTheme = {
    ...DefaultTheme,
    colors: theme === 'dark' ? darkColors : colors,
  } as unknown as ReactNavigation.Theme;

  return (
    <KeyboardProvider>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView>
          <PortalProvider>
            <SafeAreaProvider>
              <NavigationContainer linking={linking} theme={customTheme}>
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
                      <App.Screen name={SCREENS.TABS} component={TabsStack} />
                      <App.Screen name={SCREENS.CART} component={CartStack} />
                      <App.Screen name={SCREENS.ORDER} component={OrderStack} />
                      <App.Screen
                        name={SCREENS.PRODUCT}
                        component={ProductStack}
                      />
                    </App.Group>
                  ) : (
                    <App.Group>
                      {isFirstLogin ? (
                        <App.Group>
                          <App.Screen
                            name={SCREENS.ONBOARDING}
                            component={OnboardingStack}
                          />
                          <App.Screen
                            name={SCREENS.AUTH}
                            component={AuthStack}
                          />
                        </App.Group>
                      ) : (
                        <App.Screen name={SCREENS.AUTH} component={AuthStack} />
                      )}
                    </App.Group>
                  )}
                </App.Navigator>

                <StatusBar barStyle="light-content" translucent />
                {toast?.description && (
                  <Toast
                    description={toast.description}
                    variant={toast.variant}
                  />
                )}
              </NavigationContainer>
            </SafeAreaProvider>
          </PortalProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </KeyboardProvider>
  );
};
