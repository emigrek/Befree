import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import { Launching } from '@/components/illustrations';
import { Screen } from '@/components/ui/Screen';
import i18n from '@/i18n';

const Empty = () => {
  return (
    <Screen style={style.screen}>
      <Launching />
      <Text variant="bodyLarge">{i18n.t(['labels', 'empty'])}</Text>
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
