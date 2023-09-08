import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { auth } from '@/services/firebase';

interface AuthStateListenerProps {
  signInCallback: (user: User) => void;
  signOutCallback: () => void;
}

export const useAuthStateListener = ({
  signInCallback,
  signOutCallback,
}: AuthStateListenerProps) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (!user) {
        signOutCallback();
      } else {
        signInCallback(user);
      }

      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [signInCallback, signOutCallback]);

  return { loading };
};
