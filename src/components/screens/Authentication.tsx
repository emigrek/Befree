import { FC, useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import { Screen } from '@/components/ui/Screen';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';
import i18n from '@/i18n';

const Authentication: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { promptAsync } = useGoogleAuth({
    successCallback: useCallback(() => {
      setLoading(false);
    }, []),
  });

  const handleSignIn = () => {
    setLoading(true);
    promptAsync();
  };

  return (
    <Screen style={style.screen}>
      <Button
        icon={'google'}
        loading={loading}
        mode={'contained'}
        onPress={handleSignIn}
      >
        {i18n.t(['labels', 'signIn'])}
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
