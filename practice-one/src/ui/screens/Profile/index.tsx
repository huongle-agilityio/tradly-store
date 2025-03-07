import { View } from 'react-native';
import { useRouter } from 'expo-router';

// Components
import { Button } from '@/ui/components';

// Constants
import { SCREEN_ROUTES } from '@/constants';

// Stores
import { useAuthStore } from '@/stores';

export const Profile = () => {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleLogout = () => {
    clearAuth();
    router.replace(SCREEN_ROUTES.ONBOARDING);
  };

  return (
    <View>
      <Button onPress={handleLogout}>Logout</Button>
    </View>
  );
};
