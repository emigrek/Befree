import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';

import { Goals } from '@/hooks/goal/types';

// PARAM LIST TYPES

export type RootStackParamList = {
  Loading?: undefined;
  Authentication?: undefined;
  Onboarding?: undefined;
  Home?: NavigatorScreenParams<AuthDrawerStackParamList>;
};

export type AuthDrawerStackParamList = {
  Modals: NavigatorScreenParams<ModalsStackParamList>;
};

export type BottomTabsStackParamList = {
  Home: undefined;
  Addictions: undefined;
  Notifications: undefined;
};

export type HiddenAddictionsBottomTabsStackParamList = Omit<
  BottomTabsStackParamList,
  'Home'
>;

export type AddictionStackParamList = {
  Progress: { id: string };
  Relapses: { id: string };
  Achievements: { id: string };
  Settings: { id: string };
};

export type ModalsStackParamList = {
  BottomTabs: NavigatorScreenParams<BottomTabsStackParamList>;
  AddictionCreator: {
    hide: boolean;
    name?: string;
  };
  RelapseCreator: {
    addictionId: string;
  };
  Addiction: { id: string };
  HiddenAddictions: NavigatorScreenParams<HiddenAddictionsBottomTabsStackParamList>;
  Achievement: { addictionId: string; goalType: Goals };
  Edit: {
    id: string;
  };
  Sorting: undefined;
  Relapse: {
    relapseId: string;
    addictionId: string;
  };
};

export type AddictionCreatorParamList = {
  NameAndImage: undefined;
  StartDate: undefined;
};

// NAVIGATION PROP TYPES

export type ModalStackNavigationProp =
  StackNavigationProp<ModalsStackParamList>;

export type BottomTabsStackNavigationProp =
  StackNavigationProp<BottomTabsStackParamList>;

export type AddictionCreatorNavigationProp =
  StackNavigationProp<AddictionCreatorParamList>;

export type AddictionStackNavigationProp = StackNavigationProp<
  ModalsStackParamList,
  'Addiction'
>;

export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

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

export type RelapsesScreenProps = StackScreenProps<
  AddictionStackParamList,
  'Relapses'
>;

export type AddictionCreatorScreenProps = StackScreenProps<
  ModalsStackParamList,
  'AddictionCreator'
>;

export type RelapseCreatorScreenProps = StackScreenProps<
  ModalsStackParamList,
  'RelapseCreator'
>;

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
  BottomTabsStackParamList,
  'Notifications'
>;

export type HiddenAddictionsNotificationsScreenProps = StackScreenProps<
  HiddenAddictionsBottomTabsStackParamList,
  'Notifications'
>;

export type EditScreenProps = StackScreenProps<ModalsStackParamList, 'Edit'>;

export type AddictionsScreenProps = StackScreenProps<
  BottomTabsStackParamList,
  'Addictions'
>;

export type SettingsScreenProps = StackScreenProps<
  AddictionStackParamList,
  'Settings'
>;

export type RelapseScreenProps = StackScreenProps<
  ModalsStackParamList,
  'Relapse'
>;
