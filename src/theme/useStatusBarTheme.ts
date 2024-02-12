import { useMemo } from 'react';

import { useGlobalStore } from '@/store';
import { Themes } from '@/store/theme';

export const useStatusBarTheme = () => {
  const currentTheme = useGlobalStore(state => state.theme);

  return useMemo(() => {
    return currentTheme === Themes.System
      ? 'auto'
      : currentTheme === Themes.Light
        ? Themes.Dark
        : Themes.Light;
  }, [currentTheme]);
};
