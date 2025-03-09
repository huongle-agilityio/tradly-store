import { Tabs } from 'expo-router';

// Sections
import { HeaderWithSearchInput } from '@/ui/sections';

// Icons
import {
  SearchIcon,
  StoreIcon,
  HomeIcon,
  OrderHistoryIcon,
  UserIcon,
} from '@/ui/icons';

// Constants
import { SCREEN_NAME } from '@/constants';

// Themes
import { colors, fontsFamily, fontSizes, fontWeights } from '@/ui/themes';

const TabLayout = () => (
  <Tabs
    screenOptions={{
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.placeholder,
      tabBarStyle: {
        height: 72,
        paddingTop: 13,
        borderColor: colors.light,
        borderTopWidth: 0,
      },
      headerStyle: {
        backgroundColor: colors.primary,
      },
      sceneStyle: {
        flex: 1,
        backgroundColor: colors.tertiary,
      },
      headerTintColor: colors.light,
      headerTitleStyle: {
        fontFamily: fontsFamily.semiBold,
        fontWeight: fontWeights.bold,
        fontSize: fontSizes.xxl,
      },
    }}
  >
    <Tabs.Screen
      name={SCREEN_NAME.HOME}
      options={{
        title: 'Home',
        headerStyle: {
          height: 126,
          backgroundColor: colors.primary,
        },
        headerTitle: () => <HeaderWithSearchInput title="Groceries" />,
        tabBarIcon: ({ color }) => <HomeIcon size={24} color={color} />,
      }}
    />
    <Tabs.Screen
      name={SCREEN_NAME.BROWSE}
      options={{
        title: 'Browse',
        tabBarIcon: ({ color }) => <SearchIcon size={24} color={color} />,
      }}
    />
    <Tabs.Screen
      name={SCREEN_NAME.PRODUCT}
      options={{
        title: 'Product',
        tabBarIcon: ({ color }) => <StoreIcon size={24} color={color} />,
      }}
    />
    <Tabs.Screen
      name={SCREEN_NAME.ORDER_HISTORY}
      options={{
        title: 'Order History',
        tabBarIcon: ({ color }) => <OrderHistoryIcon size={24} color={color} />,
      }}
    />
    <Tabs.Screen
      name={SCREEN_NAME.PROFILE}
      options={{
        title: 'Profile',
        tabBarIcon: ({ color }) => <UserIcon size={24} color={color} />,
      }}
    />
  </Tabs>
);

export default TabLayout;
