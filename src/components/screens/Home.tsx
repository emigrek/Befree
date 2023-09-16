import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import { Bold } from '../ui/Text';

import { Screen } from '@/components/ui/Screen';
import i18n from '@/i18n';
import { useAuthStore, useGlobalStore } from '@/store';

const Home: FC = () => {
  const user = useAuthStore(state => state.user);
  const setOnboarded = useGlobalStore(state => state.setOnboarded);

  return (
    <Screen style={style.screen}>
      <Bold variant="headlineSmall">
        {i18n.t(['screens', 'home', 'gretting'], { name: user?.displayName })}
      </Bold>
      <Button
        onPress={() => {
          setOnboarded(false);
        }}
      >
        Onboarding
      </Button>
    </Screen>
  );
};

const style = StyleSheet.create({
  screen: {
    paddingHorizontal: 15,
  },
});

export { Home };
