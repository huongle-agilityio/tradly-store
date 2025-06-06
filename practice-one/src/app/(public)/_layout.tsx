import { Redirect, Stack } from 'expo-router';

// Constants
import { SCREEN_ROUTES } from '@/constants';

// Stores
import { useAuthStore } from '@/stores';

const PublicLayout = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect href={SCREEN_ROUTES.HOME} />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};

export default PublicLayout;
