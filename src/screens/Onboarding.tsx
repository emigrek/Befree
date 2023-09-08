import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import { Screen } from '@/components/Screen';
import { useGlobalStore } from '@/store';

const Onboarding: FC = () => {
  const setOnboarded = useGlobalStore(state => state.setOnboarded);

  const handleOnboard = () => {
    setOnboarded(true);
  };

  return (
    <Screen style={style.screen}>
      <Button onPress={handleOnboard} mode={'contained'}>
        Get started
      </Button>
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

export { Onboarding };
