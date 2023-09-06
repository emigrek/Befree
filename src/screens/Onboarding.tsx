import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import { Screen } from '@/components/Screen';

const Onboarding = () => {
  return (
    <Screen style={style.screen}>
      <Text>Onboarding</Text>
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

export default Onboarding;
