// Screens
import {
  BottomTabHeaderProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

// Screens
import { HeaderWithSearchInput, HeaderWithTitle } from '@/ui/sections';
import { Home, ProductCategory, Profile, Store, UpComing } from '@/ui/screens';

// Icons
import {
  HomeIcon,
  OrderHistoryIcon,
  SearchIcon,
  StoreIcon,
  UserIcon,
} from '@/ui/icons';

// Constants
import { SCREENS } from '@/constants';

// Interfaces
import { TabsStackParamList } from '@/interfaces';

// Themes
import { colors, fontsFamily, fontSizes, fontWeights } from '@/ui/themes';

const Tabs = createBottomTabNavigator<TabsStackParamList>();

export const TabsNavigation = () => {
  const headerTitle = ({ options }: BottomTabHeaderProps) => (
    <HeaderWithTitle title={options.title || ''} />
  );

  const headerInput = ({ options }: BottomTabHeaderProps) => (
    <HeaderWithSearchInput title={options.title || ''} />
  );

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
        header: headerTitle,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name={SCREENS.HOME}
        component={Home}
        options={{
          title: 'Groceries',
          header: headerInput,
          tabBarIcon: handleRenderTabBarIcon(SCREENS.HOME),
        }}
      />
      <Tabs.Screen
        name={SCREENS.BROWSE}
        component={ProductCategory}
        options={{
          header: () => <HeaderWithSearchInput hasFilter title="Browse" />,
          tabBarIcon: handleRenderTabBarIcon(SCREENS.BROWSE),
        }}
      />
      <Tabs.Screen
        name={SCREENS.STORE}
        component={Store}
        options={{
          header: () => (
            <HeaderWithSearchInput hasSearchInput={false} title="My Store" />
          ),
          tabBarIcon: handleRenderTabBarIcon(SCREENS.STORE),
        }}
      />
      <Tabs.Screen
        name={SCREENS.ORDER_HISTORY}
        component={UpComing}
        options={{
          title: 'Order History',
          tabBarIcon: handleRenderTabBarIcon(SCREENS.ORDER_HISTORY),
        }}
      />
      <Tabs.Screen
        name={SCREENS.PROFILE}
        component={Profile}
        options={{
          title: 'Profile',
          tabBarIcon: handleRenderTabBarIcon(SCREENS.PROFILE),
        }}
      />
    </Tabs.Navigator>
  );
};
