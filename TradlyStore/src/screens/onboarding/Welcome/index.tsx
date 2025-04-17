import { useCallback } from 'react';

// Components
import { Content } from './components/Content';

// Constants
import { SCREENS } from '@/constants';

// Interfaces
import { PublicScreenProps } from '@/interfaces';

export const Welcome = ({
  navigation,
}: PublicScreenProps<typeof SCREENS.ONBOARDING>) => {
  const handleNavigationLogin = useCallback(() => {
    navigation.navigate(SCREENS.LOGIN);
  }, [navigation]);

  return <Content onNavigationLogin={handleNavigationLogin} />;
};
