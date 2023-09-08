import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

import { auth } from '@/services/firebase';

interface AuthStateListenerProps {
  signInCallback: (user: User) => void;
  signOutCallback: () => void;
}

export const useAuthStateListener = ({
  signInCallback,
  signOutCallback,
}: AuthStateListenerProps) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (!user) {
        signOutCallback();
      } else {
        signInCallback(user);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [signInCallback, signOutCallback]);
};
