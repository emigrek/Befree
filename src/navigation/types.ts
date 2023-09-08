import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type MainStackParamList = {
  Home: undefined;
  AddModalTrigger: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Main: undefined;
  Add: undefined;
};

export type AddScreenProps = NativeStackScreenProps<RootStackParamList, 'Add'>;
