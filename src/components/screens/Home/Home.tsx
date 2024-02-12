import { FC } from 'react';
import { StyleSheet } from 'react-native';

import { DailyQuote, FastCreate, Greeting } from './widgets';

import { AddictionCreatorFab } from '@/components/ui/AddictionCreatorFab';
import { Screen } from '@/components/ui/Screen';
import { useAuthStore } from '@/store';

const HomeScreen: FC = () => {
  const user = useAuthStore(state => state.user);

  return (
    <>
      <Screen style={style.screen}>
        <Greeting name={user?.displayName || ''} />
        <DailyQuote />
        <FastCreate />
      </Screen>
      <AddictionCreatorFab />
    </>
  );
};

const style = StyleSheet.create({
  screen: {
    gap: 40,
  },
});

export { HomeScreen };
