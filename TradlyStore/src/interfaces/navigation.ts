import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SortType } from './api';

// Constants
import { SCREENS } from '@/constants';

// Create Types
export type PublicStackParamList = {
  [SCREENS.ONBOARDING]: undefined;
  [SCREENS.LOGIN]: undefined;
};

export type ProductStackParamList = {
  [SCREENS.PRODUCT_LIST]: {
    sortCreatedAt?: SortType;
    hasDiscount?: boolean;
    name?: string;
    category?: string;
  };
  [SCREENS.FORM_PRODUCT]: { title: string; id?: string };
  [SCREENS.PRODUCT_DETAIL]: { id: string };
};

export type PrivateStackParamList = {
  [SCREENS.CART]: undefined;
  [SCREENS.ADDRESS]: undefined;
  [SCREENS.ORDER_SUCCESS]: { carts: string };
  [SCREENS.PRODUCT_STACK]: NavigatorScreenParams<ProductStackParamList>;
};

export type TabsStackParamList = {
  [SCREENS.HOME]: undefined;
  [SCREENS.BROWSE]?: {
    sortCreatedAt?: SortType;
    hasDiscount?: boolean;
    name?: string;
    category?: string;
  };
  [SCREENS.STORE]: undefined;
  [SCREENS.ORDER_HISTORY]: undefined;
  [SCREENS.PROFILE]: undefined;
};

export type AppParamList = {
  [SCREENS.PUBLIC]: NavigatorScreenParams<PublicStackParamList>;
  [SCREENS.PRIVATE]: NavigatorScreenParams<PrivateStackParamList>;
  [SCREENS.TABS]: NavigatorScreenParams<TabsStackParamList>;
};

// Navigation
export type AppScreenProps<Screen extends keyof AppParamList> =
  NativeStackScreenProps<AppParamList, Screen>;

export type PublicScreenProps<Screen extends keyof PublicStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<PublicStackParamList, Screen>,
    NativeStackScreenProps<AppParamList>
  >;

export type PrivateScreenProps<Screen extends keyof PrivateStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<PrivateStackParamList, Screen>,
    NativeStackScreenProps<AppParamList>
  >;

export type ProductScreenProps<Screen extends keyof ProductStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<ProductStackParamList, Screen>,
    NativeStackScreenProps<AppParamList>
  >;

export type BottomTabsScreenProps<Screen extends keyof TabsStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabsStackParamList, Screen>,
    NativeStackScreenProps<AppParamList>
  >;

export type BottomTabsScreenType<Screen extends keyof TabsStackParamList> =
  BottomTabNavigationProp<TabsStackParamList, Screen>;
