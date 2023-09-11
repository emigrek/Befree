import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { auth } from '@/services/firebase';

interface AuthStateListenerProps {
  onUserChange: (user: User | null) => void;
}

export const useAuthStateListener = ({
  onUserChange,
}: AuthStateListenerProps) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      onUserChange(user);
      setLoading(false);
    });

    return unsubscribe;
  }, [onUserChange]);

  return {
    loading,
  };
};
