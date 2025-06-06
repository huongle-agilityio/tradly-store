import { Redirect } from 'expo-router';
import Constants from 'expo-constants';
import Storybook from '../../.storybook';

// Constants
import { SCREEN_ROUTES } from '@/constants';

// Stores
import { useAuthStore } from '@/stores';

const Screen = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return isAuthenticated ? (
    <Redirect href={SCREEN_ROUTES.HOME} />
  ) : (
    <Redirect href={SCREEN_ROUTES.ONBOARDING} />
  );
};

export default Constants.expoConfig?.extra?.storybookEnabled
  ? Storybook
  : Screen;
