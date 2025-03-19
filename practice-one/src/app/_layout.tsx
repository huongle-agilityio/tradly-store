import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Asset } from 'expo-asset';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ClickOutsideProvider } from 'react-native-click-outside';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'react-native-reanimated';

// Components
import { Toast } from '@/ui/components';

// Constants
import { STORAGE_KEY } from '@/constants';

// Stores
import { useAuthStore, useToast } from '@/stores';

// Themes
import { colors } from '@/ui/themes';
import { KeyboardProvider } from 'react-native-keyboard-controller';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Montserrat: require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    ...FontAwesome.font,
  });

  // Stores
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  useEffect(() => {
    const prepare = async () => {
      try {
        // Download and cache images for splash images
        await Asset.fromModule(
          require('../assets/splash-icon-dark.png'),
        ).downloadAsync();
        await Asset.fromModule(
          require('../assets/splash-icon-light.png'),
        ).downloadAsync();

        // Check if user is authenticated
        const token = await SecureStore.getItemAsync(STORAGE_KEY.TOKEN);

        setAuthenticated(!!token);

        if (loaded) {
          SplashScreen.hideAsync();
        }
      } catch (error) {
        console.error('Error loading splash images:', error);
      }
    };

    prepare();
  }, [loaded, setAuthenticated]);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error || !loaded) console.log(error);
  }, [error, loaded]);

  return <RootLayoutNav />;
}

const RootLayoutNav = () => {
  const queryClient = new QueryClient();
  const toast = useToast((state) => state.toast);

  return (
    <ClickOutsideProvider>
      <KeyboardProvider>
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
      </KeyboardProvider>
    </ClickOutsideProvider>
  );
};
