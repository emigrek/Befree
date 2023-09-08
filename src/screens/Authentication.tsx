import { FC, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import { Screen } from '@/components/Screen';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';

const Authentication: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { promptAsync } = useGoogleAuth({
    successCallback: () => setLoading(false),
  });

  const handleSignIn = () => {
    setLoading(true);
    promptAsync();
  };

  return (
    <Screen style={style.screen}>
      <Button loading={loading} mode={'contained'} onPress={handleSignIn}>
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
