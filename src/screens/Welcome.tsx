import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { Screen } from '@/components/Screen';
import { Themes, useThemeStore } from '@/stores/theme';

const Welcome = () => {
  const theme = useThemeStore(state => state.theme);
  const setTheme = useThemeStore(state => state.setTheme);

  return (
    <Screen style={style.screen}>
      <Text>Current theme: {theme}</Text>
      <Button mode="contained" onPress={() => setTheme(Themes.Dark)}>
        Dark mode
      </Button>
      <Button mode="contained" onPress={() => setTheme(Themes.Light)}>
        Light mode
      </Button>
      <Button mode="contained" onPress={() => setTheme(Themes.System)}>
        System mode
      </Button>
    </Screen>
  );
};

const style = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
});

export default Welcome;
