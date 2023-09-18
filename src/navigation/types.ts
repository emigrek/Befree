import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AuthDrawerStackParamList = {
  Modals: undefined;
};

export type BottomTabsStackParamList = {
  Home: undefined;
  Addictions: undefined;
};

export type ModalsStackParamList = {
  BottomTabs: undefined;
  Add: undefined;
};

export type AddScreenProps = NativeStackScreenProps<
  ModalsStackParamList,
  'Add'
>;
