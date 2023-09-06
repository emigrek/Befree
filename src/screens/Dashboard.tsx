import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { Screen } from '@/components/Screen';
import { Bold } from '@/components/Text';
import { useGlobalStore } from '@/store';
import { Themes } from '@/store/theme';

const Dashboard = () => {
  const { theme, setTheme } = useGlobalStore(state => ({
    theme: state.theme,
    setTheme: state.setTheme,
  }));

  return (
    <Screen style={style.screen}>
      <Text variant={'titleLarge'}>
        Current theme: <Bold>{theme}</Bold>
      </Text>
      <View style={style.buttonsView}>
        {Object.values(Themes).map((theme, index) => (
          <Button
            key={index}
            mode={'contained'}
            onPress={() => setTheme(theme)}
          >
            {theme}
          </Button>
        ))}
      </View>
    </Screen>
  );
};

const style = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
});

export default Dashboard;
