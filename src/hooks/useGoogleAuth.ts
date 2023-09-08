import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { useEffect } from 'react';

import googleConfig from '@/config/google';
import { auth } from '@/services/firebase';

WebBrowser.maybeCompleteAuthSession();

export const useGoogleAuth = () => {
  const [, response, promptAsync] = Google.useAuthRequest({
    ...googleConfig,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  return [promptAsync];
};
