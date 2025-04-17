import { useCallback } from 'react';

// Components
import { Content } from './components/Content';

// Constants
import { SCREENS } from '@/constants';

// Interfaces
import { OnboardingScreenProps } from '@/interfaces';

export const Welcome = ({
  navigation,
}: OnboardingScreenProps<typeof SCREENS.WELCOME>) => {
  const handleNavigationLogin = useCallback(() => {
    navigation.navigate(SCREENS.AUTH, { screen: SCREENS.LOGIN });
  }, [navigation]);

  return <Content onNavigationLogin={handleNavigationLogin} />;
};
