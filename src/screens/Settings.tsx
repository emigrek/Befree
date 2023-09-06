import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import { Screen } from '@/components/Screen';

const Settings: FC = () => {
  return (
    <Screen style={style.screen}>
      <Text variant={'titleLarge'}>Theme</Text>
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

export { Settings };
