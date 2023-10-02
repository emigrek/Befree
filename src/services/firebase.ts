import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';

import firebaseConfig from '@/config/firebase';
import { SecureAuthStore } from '@/utils';

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(SecureAuthStore),
});

export { app, auth };
