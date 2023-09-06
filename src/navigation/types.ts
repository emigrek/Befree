import { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type InitializationStackParamList = {
  Onboarding: undefined;
  Authentication: undefined;
};

export type MainStackParamList = {
  Dashboard: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Initialization: NavigatorScreenParams<InitializationStackParamList>;
  Main: NavigatorScreenParams<MainStackParamList>;
};

export type OnboradingProps = NativeStackScreenProps<
  InitializationStackParamList,
  'Onboarding'
>;

export type AuthenticationProps = NativeStackScreenProps<
  InitializationStackParamList,
  'Authentication'
>;
