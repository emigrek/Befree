import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';

import firebaseConfig from '@/config/firebase';
import { LargeSecureStore } from '@/utils';

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(new LargeSecureStore()),
});

export { app, auth };
