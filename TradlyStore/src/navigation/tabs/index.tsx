import {
  BottomTabHeaderProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';

// Screens
import { Browse, Home, Store } from '@/screens';
import { HeaderWithSearchInput, HeaderWithTitle } from '@/components/shared';

// Icons
import {
  HomeIcon,
  OrderHistoryIcon,
  SearchIcon,
  StoreIcon,
  UserIcon,
} from '@/components/icons';

// Constants
import { SCREENS } from '@/constants';

// Interfaces
import { TabsStackParamList } from '@/interfaces';

// Themes
import { fontsFamily, fontSizes, fontWeights } from '@/themes';

const Tabs = createBottomTabNavigator<TabsStackParamList>();

const HeaderTitle = ({ options }: BottomTabHeaderProps) => (
  <HeaderWithTitle title={options.title || ''} />
);

const HeaderInput = ({ options }: BottomTabHeaderProps) => (
  <HeaderWithSearchInput title={options.title || ''} />
);

export const TabsStack = () => {
  const { colors } = useTheme();

  const handleRenderTabBarIcon =
    (screen: keyof TabsStackParamList) =>
    ({ color }: { color: string }) => {
      switch (screen) {
        case SCREENS.HOME:
          return <HomeIcon size={24} color={color} />;
        case SCREENS.BROWSE:
          return <SearchIcon size={24} color={color} />;
        case SCREENS.STORE:
          return <StoreIcon size={24} color={color} />;
        case SCREENS.ORDER_HISTORY:
          return <OrderHistoryIcon size={24} color={color} />;
        case SCREENS.PROFILE:
          return <UserIcon size={24} color={color} />;
        default:
          return null;
      }
    };

  return (
    <Tabs.Navigator
      screenOptions={{
        lazy: true,
        tabBarActiveTintColor: colors.tabs.tabActiveIColor,
        tabBarInactiveTintColor: colors.tabs.tabBarInactiveTintColor,
        tabBarStyle: {
          height: 72,
          paddingTop: 13,
          backgroundColor: colors.tabs.tabBackground,
          borderTopWidth: 0,
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
        header: HeaderTitle,
        tabBarHideOnKeyboard: true,
        animation: 'fade',
      }}
    >
      <Tabs.Screen
        name={SCREENS.HOME}
        component={Home}
        options={{
          sceneStyle: {
            backgroundColor: colors.background,
          },
          title: 'Groceries',
          header: HeaderInput,
          tabBarIcon: handleRenderTabBarIcon(SCREENS.HOME),
        }}
      />
      <Tabs.Screen
        name={SCREENS.BROWSE}
        component={Browse}
        options={{
          sceneStyle: {
            backgroundColor: colors.background,
          },
          header: () => <HeaderWithSearchInput hasFilter title="Browse" />,
          tabBarIcon: handleRenderTabBarIcon(SCREENS.BROWSE),
        }}
      />
      <Tabs.Screen
        name={SCREENS.STORE}
        component={Store}
        options={{
          sceneStyle: {
            backgroundColor: colors.background,
          },
          header: () => (
            <HeaderWithSearchInput hasSearchInput={false} title="My Store" />
          ),
          tabBarIcon: handleRenderTabBarIcon(SCREENS.STORE),
        }}
      />
      <Tabs.Screen
        name={SCREENS.ORDER_HISTORY}
        getComponent={() => require('@/screens/tab/OrderHistory').OrderHistory}
        options={{
          sceneStyle: {
            backgroundColor: colors.background,
          },
          title: 'Order History',
          tabBarIcon: handleRenderTabBarIcon(SCREENS.ORDER_HISTORY),
        }}
      />
      <Tabs.Screen
        name={SCREENS.PROFILE}
        getComponent={() => require('@/screens/tab/Profile').Profile}
        options={{
          sceneStyle: {
            backgroundColor: colors.background,
          },
          title: 'Profile',
          tabBarIcon: handleRenderTabBarIcon(SCREENS.PROFILE),
        }}
      />
    </Tabs.Navigator>
  );
};
