import { UserCredential } from 'firebase/auth';
import { FC, useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, HelperText, Text } from 'react-native-paper';

import { Login } from '@/components/illustrations';
import { Screen } from '@/components/ui/Screen';
import { Bold } from '@/components/ui/Text';
import { useErrorState } from '@/hooks/useErrorState';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';
import i18n from '@/i18n';
import { createUser } from '@/services/queries';

const Authentication: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { visible, message, setVisible, setMessage, clear } = useErrorState();

  const { promptAsync } = useGoogleAuth({
    successCallback: useCallback(
      (credential: UserCredential) => {
        setLoading(false);
        createUser({ credential });
        clear();
      },
      [clear],
    ),
    errorCallback: useCallback(() => {
      setLoading(false);
      setMessage(i18n.t(['screens', 'authentication', 'errorMessage']));
      setVisible(true);
    }, [setMessage, setVisible]),
    dismissCallback: useCallback(() => {
      setLoading(false);
      setMessage(i18n.t(['screens', 'authentication', 'dismissMessage']));
      setVisible(true);
    }, [setMessage, setVisible]),
    cancelCallback: useCallback(() => {
      setLoading(false);
      setMessage(i18n.t(['screens', 'authentication', 'cancelMessage']));
      setVisible(true);
    }, [setMessage, setVisible]),
  });

  const handleSignIn = () => {
    clear();
    setLoading(true);
    promptAsync();
  };

  return (
    <Screen style={style.screen}>
      <View style={style.heading}>
        <Login style={style.illustration} />
        <View style={style.texts}>
          <Bold style={style.title} variant={'displayMedium'}>
            {i18n.t(['screens', 'authentication', 'title'])}
          </Bold>
          <Text style={style.subtitle} variant={'bodyMedium'}>
            {i18n.t(['screens', 'authentication', 'subtitle'])}
          </Text>
        </View>
      </View>
      <View>
        <Button
          icon={'google'}
          loading={loading}
          disabled={loading}
          contentStyle={style.button}
          mode={'contained'}
          onPress={handleSignIn}
        >
          {i18n.t(['labels', 'signIn'])}
        </Button>
        <HelperText style={style.helperText} type="error" visible={visible}>
          {message}
        </HelperText>
      </View>
    </Screen>
  );
};

const style = StyleSheet.create({
  screen: {
    paddingHorizontal: 40,
    justifyContent: 'space-evenly',
  },
  heading: {
    gap: 50,
  },
  texts: {
    gap: 5,
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  illustration: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 48,
    justifyContent: 'center',
  },
  helperText: {
    textAlign: 'center',
  },
});

export { Authentication };
