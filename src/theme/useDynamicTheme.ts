import { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

import { colors as colorOverrides } from './colors';

import { Themes, useThemeStore } from '@/stores/theme';

export const useDynamicTheme = () => {
  const colorScheme = useColorScheme();
  const userTheme = useThemeStore(state => state.theme);

  return useMemo(() => {
    const theme =
      userTheme === 'system'
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
