import { useCallback } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';

// Components
import { Button } from '@/ui/components';

// Constants
import { SCREEN_ROUTES } from '@/constants';

// Stores
import { useAuthStore } from '@/stores';

export const Profile = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleLogout = useCallback(() => {
    clearAuth();
    router.replace(SCREEN_ROUTES.ONBOARDING);
  }, [clearAuth]);

  return (
    <View>
      <Button onPress={handleLogout}>Logout</Button>
    </View>
  );
};
