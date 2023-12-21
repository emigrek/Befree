import { createNavigationContainerRef } from '@react-navigation/native';

import { ModalsStackParamList } from './types';

const modalsNavigationContainerRef =
  createNavigationContainerRef<ModalsStackParamList>();

export { modalsNavigationContainerRef };
