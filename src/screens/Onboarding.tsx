import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import { Screen } from '@/components/Screen';
import { OnboradingProps } from '@/navigation';
import { useGlobalStore } from '@/store';

const Onboarding: FC<OnboradingProps> = ({ navigation }) => {
  const setOnboarded = useGlobalStore(state => state.setOnboarded);

  const handleOnboarding = () => {
    setOnboarded(true);
    navigation.navigate('Authentication');
  };

  return (
    <Screen style={style.screen}>
      <Button onPress={handleOnboarding} mode={'contained'}>
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
