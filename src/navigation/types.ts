import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';

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

export type ModalStackNavigationProp =
  StackNavigationProp<ModalsStackParamList>;

export type CreationStackParamList = {
  Name: undefined;
  StartDate: undefined;
  Image: undefined;
  Tags: undefined;
};

export type AddScreenProps = NativeStackScreenProps<
  ModalsStackParamList,
  'Add'
>;

export type CreationWizardImageScreenProps = NativeStackScreenProps<
  CreationStackParamList,
  'Image'
>;

export type CreationWizardNameScreenProps = NativeStackScreenProps<
  CreationStackParamList,
  'Name'
>;

export type CreationWizardStartDateScreenProps = NativeStackScreenProps<
  CreationStackParamList,
  'StartDate'
>;

export type CreationWizardTagsScreenProps = NativeStackScreenProps<
  CreationStackParamList,
  'Tags'
>;
