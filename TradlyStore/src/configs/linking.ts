import { LinkingOptions } from '@react-navigation/native';

// Constants
import { LINKING_URL, SCREENS } from '@/constants';

// Interfaces
import { AppParamList } from '@/interfaces';

export const linking: LinkingOptions<AppParamList> = {
  prefixes: [LINKING_URL.BASE, LINKING_URL.BASE_HTTP, LINKING_URL.BASE_HTTPS],
  config: {
    screens: {
      [SCREENS.TABS]: {
        screens: {
          [SCREENS.HOME]: SCREENS.HOME,
          [SCREENS.BROWSE]: SCREENS.BROWSE,
        },
      },
      [SCREENS.PRIVATE]: {
        screens: {
          [SCREENS.PRODUCT_STACK]: {
            screens: {
              [SCREENS.PRODUCT_DETAIL]: `${SCREENS.PRODUCT_DETAIL}/:id`,
            },
          },
        },
      },
    },
  },
};
