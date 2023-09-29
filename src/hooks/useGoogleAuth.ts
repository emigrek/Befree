import * as Google from 'expo-auth-session/providers/google';
import {
  GoogleAuthProvider,
  UserCredential,
  signInWithCredential,
} from 'firebase/auth';
import { useEffect } from 'react';

import googleConfig from '@/config/google';
import { auth } from '@/services/firebase';

type GoogleAuthProps = {
  openedCallback?: () => void;
  successCallback?: (credential: UserCredential) => void;
  errorCallback?: () => void;
  cancelCallback?: () => void;
  dismissCallback?: () => void;
};

export const useGoogleAuth = ({
  openedCallback,
  successCallback,
  errorCallback,
  cancelCallback,
  dismissCallback,
}: GoogleAuthProps) => {
  const [, response, promptAsync] = Google.useAuthRequest({
    ...googleConfig,
  });

  useEffect(() => {
    if (response?.type === 'opened') {
      openedCallback && openedCallback();
    } else if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).then(credential => {
        successCallback && successCallback(credential);
      });
    } else if (response?.type === 'error') {
      errorCallback && errorCallback();
    } else if (response?.type === 'cancel') {
      cancelCallback && cancelCallback();
    } else if (response?.type === 'dismiss') {
      dismissCallback && dismissCallback();
    }
  }, [
    response,
    successCallback,
    errorCallback,
    cancelCallback,
    dismissCallback,
    openedCallback,
  ]);

  return {
    promptAsync,
  };
};
