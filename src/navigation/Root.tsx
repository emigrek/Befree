import { User } from 'firebase/auth';
import { useCallback } from 'react';

import { Main } from './Main';

import { useAuthStateListener } from '@/hooks/useAuthStateListener';
import { Authentication, Loading, Onboarding } from '@/screens';
import { useAuthStore, useGlobalStore } from '@/store';

const Root = () => {
  const { user, setUser } = useAuthStore(state => ({
    user: state.user,
    setUser: state.setUser,
  }));
  const { onboarded } = useGlobalStore(state => ({
    onboarded: state.onboarded,
  }));

  const handleSignIn = useCallback(
    (u: User) => {
      setUser(u);
    },
    [setUser],
  );

  const handleSignOut = useCallback(() => {
    setUser(null);
  }, [setUser]);

  const { loading } = useAuthStateListener({
    signInCallback: handleSignIn,
    signOutCallback: handleSignOut,
  });

  if (!onboarded) {
    return <Onboarding />;
  }

  if (loading) {
    return <Loading size={'large'} />;
  }

  return user ? <Main /> : <Authentication />;
};

export { Root };
