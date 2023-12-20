import { createNavigationContainerRef } from '@react-navigation/native';

import { ModalsStackParamList } from './types';

export const navigationRef =
  createNavigationContainerRef<ModalsStackParamList>();
