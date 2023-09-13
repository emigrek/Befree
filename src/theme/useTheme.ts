import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import merge from 'deepmerge';
import { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

import {
  dark as darkColorsOverride,
  light as lightColorsOverride,
  lightsOut as lightsOutOverride,
} from './overrides';

import { useGlobalStore } from '@/store';
import { Themes } from '@/store/theme';

const CombinedDarkTheme = merge(DarkTheme, MD3DarkTheme);
const CombinedLightTheme = merge(DefaultTheme, MD3LightTheme);

export const useTheme = () => {
  const colorScheme = useColorScheme();
  const { userTheme, lightsOut } = useGlobalStore(state => ({
    userTheme: state.theme,
    lightsOut: state.lightsOut,
  }));

  return useMemo(() => {
    const dark = {
      ...CombinedDarkTheme,
      colors: {
        ...CombinedDarkTheme.colors,
        ...darkColorsOverride,
        ...(lightsOut && lightsOutOverride),
      },
    };
    const light = {
      ...CombinedLightTheme,
      colors: {
        ...CombinedLightTheme.colors,
        ...lightColorsOverride,
      },
    };

    const theme =
      userTheme === Themes.System
        ? colorScheme === Themes.Dark
          ? dark
          : light
        : userTheme === Themes.Dark
        ? dark
        : light;

    return theme;
  }, [userTheme, colorScheme, lightsOut]);
};
