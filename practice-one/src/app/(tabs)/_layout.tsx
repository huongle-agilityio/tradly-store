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

// Themes
import { colors } from '@/ui/themes';

const TabLayout = () => {
  return (
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
      }}
    >
      <Tabs.Screen
        name="index"
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
        name="browse"
        options={{
          title: 'Browse',
          tabBarIcon: ({ color }) => <SearchIcon size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="product"
        options={{
          title: 'Product',
          tabBarIcon: ({ color }) => <StoreIcon size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="order-history"
        options={{
          title: 'Order History',
          tabBarIcon: ({ color }) => (
            <OrderHistoryIcon size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <UserIcon size={24} color={color} />,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
