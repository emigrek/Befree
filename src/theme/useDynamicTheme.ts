import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import merge from 'deepmerge';
import { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

import { colors as colorOverrides } from './colors';

import { useGlobalStore } from '@/store';
import { Themes } from '@/store/theme';

const CombinedDarkTheme = merge(DarkTheme, MD3DarkTheme);
const CombinedLightTheme = merge(DefaultTheme, MD3LightTheme);

export const useDynamicTheme = () => {
  const colorScheme = useColorScheme();
  const userTheme = useGlobalStore(state => state.theme);

  return useMemo(() => {
    const theme =
      userTheme === Themes.System
        ? colorScheme === Themes.Dark
          ? CombinedDarkTheme
          : CombinedLightTheme
        : userTheme === Themes.Dark
        ? CombinedDarkTheme
        : CombinedLightTheme;

    return {
      ...theme,
      colors: {
        ...theme.colors,
        ...colorOverrides,
      },
    };
  }, [userTheme, colorScheme]);
};
