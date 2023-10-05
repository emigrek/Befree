import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import { Launching } from '@/components/illustrations';
import { Screen } from '@/components/ui/Screen';
import { Bold } from '@/components/ui/Text';

const Empty = () => {
  return (
    <Screen style={style.screen}>
      <Launching />
      <Text variant="headlineSmall">
        Start better life <Bold>today</Bold>!
      </Text>
    </Screen>
  );
};

const style = StyleSheet.create({
  screen: {
    paddingHorizontal: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
    gap: 40,
    flex: 1,
  },
});

export { Empty };
