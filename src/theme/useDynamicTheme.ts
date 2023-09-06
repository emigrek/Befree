import { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

import { colors as colorOverrides } from './colors';

import { useGlobalStore } from '@/store';
import { Themes } from '@/store/theme';

export const useDynamicTheme = () => {
  const colorScheme = useColorScheme();
  const userTheme = useGlobalStore(state => state.theme);

  return useMemo(() => {
    const theme =
      userTheme === Themes.System
        ? colorScheme === Themes.Dark
          ? MD3DarkTheme
          : MD3LightTheme
        : userTheme === Themes.Dark
        ? MD3DarkTheme
        : MD3LightTheme;

    return {
      ...theme,
      colors: {
        ...theme.colors,
        ...colorOverrides,
      },
    };
  }, [userTheme, colorScheme]);
};
