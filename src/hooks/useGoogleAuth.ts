import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
// import {
//     GoogleAuthProvider,
//     onAuthStateChanged,
//     signInWithCredential,
// } from 'firebase/auth';
// import { auth } from '@/services/firebase';

import googleConfig from '@/config/google';

WebBrowser.maybeCompleteAuthSession();

export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    ...googleConfig,
  });

  return [promptAsync];
};
