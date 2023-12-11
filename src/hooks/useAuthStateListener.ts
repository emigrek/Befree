import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';

interface AuthStateListenerProps {
  onUserChange: (user: FirebaseAuthTypes.User | null) => void;
}

export const useAuthStateListener = ({
  onUserChange,
}: AuthStateListenerProps) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const sub = auth().onAuthStateChanged(user => {
      onUserChange(user);
      setLoading(false);
    });

    return sub;
  }, [onUserChange]);

  return {
    loading,
  };
};
