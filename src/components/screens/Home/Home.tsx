import { FC } from 'react';
import { StyleSheet } from 'react-native';

import { DailyQuote, FastCreate } from './widgets';
import { Greeting } from './widgets/Greeting';

import { AddictionCreatorFab } from '@/components/ui/AddictionCreatorFab';
import { Screen } from '@/components/ui/Screen';
import { useAuthStore } from '@/store';

const Home: FC = () => {
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

export { Home };
