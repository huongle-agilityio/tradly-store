import { Redirect } from 'expo-router';
import Constants from 'expo-constants';
import Storybook from '../../.storybook';
import { SCREEN_ROUTES } from '@/constants';

const Screen = () => {
  const isOnboarding = true;
  return isOnboarding ? (
    <Redirect href={SCREEN_ROUTES.ONBOARDING} />
  ) : (
    <Redirect href={SCREEN_ROUTES.HOME} />
  );
};

export default Constants.expoConfig?.extra?.storybookEnabled
  ? Storybook
  : Screen;
