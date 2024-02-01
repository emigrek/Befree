import { FC } from 'react';
import { StyleSheet } from 'react-native';

import { DailyQuote, FastCreate } from './widgets';

import { AddictionCreatorFab } from '@/components/ui/AddictionCreatorFab';
import { Screen } from '@/components/ui/Screen';
import { Bold } from '@/components/ui/Text';
import i18n from '@/i18n';
import { useAuthStore } from '@/store';

const Home: FC = () => {
  const user = useAuthStore(state => state.user);

  return (
    <>
      <Screen style={style.screen}>
        {user && (
          <Bold variant="headlineMedium" style={style.text}>
            {i18n.t(['screens', 'home', 'gretting'], {
              name: user?.displayName,
            })}
          </Bold>
        )}
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
  text: {
    paddingHorizontal: 20,
  },
});

export { Home };
