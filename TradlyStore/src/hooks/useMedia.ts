import { useWindowDimensions } from 'react-native';

// Constants
import { MEDIA_SCREEN } from '@/constants';

/**
 * Hook to detect the type of device screen based on the window width.
 *
 * @returns An object with the following properties:
 *   - `width`: The current window width.
 *   - `isMobile`: A boolean indicating whether the screen is a mobile screen.
 *   - `isTablet`: A boolean indicating whether the screen is a tablet screen.
 */
export const useMedia = () => {
  const { width, height } = useWindowDimensions();

  return {
    width,
    height,
    isMobile: width < MEDIA_SCREEN.TABLET,
    isTablet: width >= MEDIA_SCREEN.TABLET,
  };
};
