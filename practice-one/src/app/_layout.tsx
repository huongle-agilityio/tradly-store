import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ClickOutsideProvider } from 'react-native-click-outside';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'react-native-reanimated';

// Components
import { Toast } from '@/ui/components';

// Constants
import { STORAGE_KEY } from '@/constants';

// Stores
import { useAuthStore, useCartStore, useToast } from '@/stores';

// Themes
import { colors } from '@/ui/themes';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [setAuthenticated, setUser] = useAuthStore((state) => [
    state.setAuthenticated,
    state.setUser,
  ]);
  const setCarts = useCartStore((state) => state.setCarts);
  const [loaded, error] = useFonts({
    Montserrat: require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) console.log(error);
  }, [error]);

  useEffect(() => {
    const getAuthenticated = async () => {
      const user = await AsyncStorage.getItem(STORAGE_KEY.USER);
      const token = await AsyncStorage.getItem(STORAGE_KEY.TOKEN);
      const carts = await AsyncStorage.getItem(STORAGE_KEY.CART);

      if (loaded) {
        SplashScreen.hideAsync();
      }

      setCarts(JSON.parse(carts || '[]'));
      setAuthenticated(!!token);
      setUser(JSON.parse(user || '{}'));
    };
    getAuthenticated();
  }, [loaded, setAuthenticated, setCarts, setUser]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const RootLayoutNav = () => {
  const queryClient = new QueryClient();
  const toast = useToast((state) => state.toast);

  return (
    <ClickOutsideProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />

          {toast?.description && (
            <Toast description={toast.description} variant={toast.variant} />
          )}
          <StatusBar backgroundColor={colors.primary} barStyle="default" />
        </SafeAreaView>
      </QueryClientProvider>
    </ClickOutsideProvider>
  );
};
