import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';

// PARAM LIST TYPES

export type AuthDrawerStackParamList = {
  Modals: undefined;
};

export type BottomTabsStackParamList = {
  Home: undefined;
  Addictions: undefined;
};

export type AddictionStackParamList = {
  Progress: {
    id: string;
  };
};

export type ModalsStackParamList = {
  BottomTabs: NavigatorScreenParams<BottomTabsStackParamList>;
  Add: undefined;
  Addiction: NavigatorScreenParams<AddictionStackParamList>;
  Edit: {
    id: string;
  };
  Sorting: undefined;
};

export type CreationStackParamList = {
  NameAndImage: undefined;
  StartDate: undefined;
};

// NAVIGATION PROP TYPES

export type ModalStackNavigationProp =
  StackNavigationProp<ModalsStackParamList>;

export type CreationStackNavigationProp =
  StackNavigationProp<CreationStackParamList>;

export type AddictionStackNavigationProp = StackNavigationProp<
  ModalsStackParamList,
  'Addiction'
>;

// ROUTE PROP TYPES

export type AddictionStackRouteProp = RouteProp<
  AddictionStackParamList,
  'Progress'
>;

// SCREEN PROPS

export type AddScreenProps = StackScreenProps<ModalsStackParamList, 'Add'>;

export type ProgressScreenProps = StackScreenProps<
  AddictionStackParamList,
  'Progress'
>;

export type EditScreenProps = StackScreenProps<ModalsStackParamList, 'Edit'>;
