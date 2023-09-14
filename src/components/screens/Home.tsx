import { FC } from 'react';
import { StyleSheet } from 'react-native';

import { Bold } from '../ui/Text';

import { Screen } from '@/components/ui/Screen';
import i18n from '@/i18n';
import { useAuthStore } from '@/store';

const Home: FC = () => {
  const user = useAuthStore(state => state.user);

  return (
    <Screen style={style.screen}>
      <Bold variant="headlineSmall">
        {i18n.t(['screens', 'home', 'gretting'], { name: user?.displayName })}
      </Bold>
    </Screen>
  );
};

const style = StyleSheet.create({
  screen: {
    paddingHorizontal: 15,
  },
});

export { Home };
