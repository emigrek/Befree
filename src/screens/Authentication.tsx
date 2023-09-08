import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import { Screen } from '@/components/Screen';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';
import { AuthenticationProps } from '@/navigation';

const Authentication: FC<AuthenticationProps> = () => {
  const [promptAsync] = useGoogleAuth();

  return (
    <Screen style={style.screen}>
      <Button mode={'contained'} onPress={() => promptAsync()}>
        Sign in
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

export { Authentication };
