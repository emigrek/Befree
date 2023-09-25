import { NavigatorScreenParams } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';

// PARAM LIST TYPES

export type AuthDrawerStackParamList = {
  Modals: undefined;
};

export type BottomTabsStackParamList = {
  Home: undefined;
  Addictions: undefined;
};

export type ModalsStackParamList = {
  BottomTabs: NavigatorScreenParams<BottomTabsStackParamList>;
  Add: undefined;
};

export type CreationStackParamList = {
  Name: undefined;
  StartDate: undefined;
  Image: undefined;
  Tags: undefined;
};

// NAVIGATION PROP TYPES

export type ModalStackNavigationProp =
  StackNavigationProp<ModalsStackParamList>;

export type CreationStackNavigationProp =
  StackNavigationProp<CreationStackParamList>;

// SCREEN PROPS

export type AddScreenProps = StackScreenProps<ModalsStackParamList, 'Add'>;
