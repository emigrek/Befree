import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';

import { Goals } from '@/hooks/goal/types';

// PARAM LIST TYPES

export type AuthDrawerStackParamList = {
  Modals: undefined;
};

export type BottomTabsStackParamList = {
  Home: undefined;
  Addictions: undefined;
};

export type AddictionStackParamList = {
  Progress: { id: string };
  Achievements: { id: string };
  Notifications: { id: string };
};

export type ModalsStackParamList = {
  BottomTabs: NavigatorScreenParams<BottomTabsStackParamList>;
  Add: undefined;
  Addiction: { id: string };
  Achievement: { addictionId: string; goalType: Goals };
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
  ModalsStackParamList,
  'Addiction'
>;

export type AchievementStackRouteProp = RouteProp<
  ModalsStackParamList,
  'Achievement'
>;

// SCREEN PROPS

export type AddScreenProps = StackScreenProps<ModalsStackParamList, 'Add'>;

export type AddictionScreenProps = StackScreenProps<
  ModalsStackParamList,
  'Addiction'
>;

export type ProgressScreenProps = StackScreenProps<
  AddictionStackParamList,
  'Progress'
>;

export type AchievementsScreenProps = StackScreenProps<
  AddictionStackParamList,
  'Achievements'
>;

export type AchievementScreenProps = StackScreenProps<
  ModalsStackParamList,
  'Achievement'
>;

export type NotificationsScreenProps = StackScreenProps<
  AddictionStackParamList,
  'Notifications'
>;

export type EditScreenProps = StackScreenProps<ModalsStackParamList, 'Edit'>;
