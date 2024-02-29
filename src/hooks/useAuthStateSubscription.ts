import auth from '@react-native-firebase/auth';
import { useEffect } from 'react';

import { useAuthStore } from '@/store';

export const useAuthStateSubscription = () => {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const unsub = auth().onAuthStateChanged(newUser => {
      setUser(newUser);
      setLoading(false);
    });

    return () => unsub();
  }, [setUser, setLoading]);
};
