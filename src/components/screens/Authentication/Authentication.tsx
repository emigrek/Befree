import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { FC, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, HelperText, Text } from 'react-native-paper';

import { Login } from '@/components/illustrations';
import { Screen } from '@/components/ui/Screen';
import { Bold } from '@/components/ui/Text';
import { keys } from '@/config/keys';
import i18n from '@/i18n';
import { useNetInfoStore } from '@/store';

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: keys.webClientId,
});

const AuthenticationScreen: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const netState = useNetInfoStore(state => state.netState);

  const handleSignIn = async () => {
    setLoading(true);

    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const data = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(data.idToken);

      auth()
        .signInWithCredential(googleCredential)
        .then(async () => {
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          console.log('Error when signing in with Google', error);
        });
    } catch (error) {
      setLoading(false);
      console.log('Error when using Google Services', error);
    }
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
        <HelperText
          visible={!netState?.isConnected}
          type={'info'}
          style={style.helperText}
        >
          {i18n.t(['screens', 'authentication', 'helperText'])}
        </HelperText>
        <Button
          icon={'google'}
          loading={loading}
          disabled={loading || !netState?.isConnected}
          contentStyle={style.button}
          mode={'contained'}
          onPress={handleSignIn}
        >
          {i18n.t(['labels', 'signIn'])}
        </Button>
      </View>
    </Screen>
  );
};

const style = StyleSheet.create({
  screen: {
    paddingHorizontal: 40,
    justifyContent: 'space-around',
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
    marginBottom: 20,
  },
});

export { AuthenticationScreen };
