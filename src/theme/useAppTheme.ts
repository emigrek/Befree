import { useTheme } from 'react-native-paper';

import { useDynamicTheme } from '@/theme';

export type AppTheme = ReturnType<typeof useDynamicTheme>;

export const useAppTheme = () => {
  return useTheme<AppTheme>();
};
