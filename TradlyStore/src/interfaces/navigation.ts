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

export type AuthStackParamList = {
  [SCREENS.LOGIN]: undefined;
};

export type OnboardingStackParamList = {
  [SCREENS.WELCOME]: undefined;
};

export type CartStackParamList = {
  [SCREENS.SHOPPING_CART]: undefined;
};

export type OrderStackParamList = {
  [SCREENS.ADDRESS]: undefined;
  [SCREENS.ORDER_SUCCESS]: { carts: string };
};

export type ProductStackParamList = {
  [SCREENS.PRODUCT_LIST]: {
    sortCreatedAt?: SortType;
    hasDiscount?: boolean;
    name?: string;
    category?: string;
  };
  [SCREENS.ADD_PRODUCT]: undefined;
  [SCREENS.EDIT_PRODUCT]: { id?: string };
  [SCREENS.PRODUCT_DETAIL]: { id: string };
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
  [SCREENS.AUTH]: NavigatorScreenParams<AuthStackParamList>;
  [SCREENS.ONBOARDING]: NavigatorScreenParams<OnboardingStackParamList>;
  [SCREENS.CART]: NavigatorScreenParams<CartStackParamList>;
  [SCREENS.ORDER]: NavigatorScreenParams<OrderStackParamList>;
  [SCREENS.PRODUCT]: NavigatorScreenParams<ProductStackParamList>;
  [SCREENS.TABS]: NavigatorScreenParams<TabsStackParamList>;
};

// Navigation
export type AppScreenProps<Screen extends keyof AppParamList> =
  NativeStackScreenProps<AppParamList, Screen>;

export type AuthScreenProps<Screen extends keyof AuthStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<AuthStackParamList, Screen>,
    NativeStackScreenProps<AppParamList>
  >;

export type CartScreenProps<Screen extends keyof CartStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<CartStackParamList, Screen>,
    NativeStackScreenProps<AppParamList>
  >;

export type OnboardingScreenProps<
  Screen extends keyof OnboardingStackParamList,
> = CompositeScreenProps<
  NativeStackScreenProps<OnboardingStackParamList, Screen>,
  NativeStackScreenProps<AppParamList>
>;

export type OrderScreenProps<Screen extends keyof OrderStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<OrderStackParamList, Screen>,
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
