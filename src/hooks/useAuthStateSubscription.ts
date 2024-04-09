import auth from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';

import { useAuthStore } from '@/store';

export const useAuthStateSubscription = () => {
  const [initializing, setInitializing] = useState(true);
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const unsub = auth().onAuthStateChanged(newUser => {
      setUser(newUser);
      setLoading(false);
      if (initializing) setInitializing(false);
    });

    return () => unsub();
  }, [setUser, setLoading, initializing]);

  return { initializing };
};
