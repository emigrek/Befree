import { FC } from 'react';
import { StyleSheet } from 'react-native';

import { Screen } from '@/components/ui/Screen';

const Addictions: FC = () => {
  return <Screen style={style.screen}></Screen>;
};

const style = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
});

export { Addictions };
