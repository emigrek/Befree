import * as LocalAuthentication from 'expo-local-authentication';
import React, { FC, useCallback } from 'react';

import { useLocalAuthStore } from '@/store';

interface LocalAuthLayoutProps {
  children: React.ReactNode;
  lockedComponent: (localAuthenticate: () => void) => React.ReactNode;
}

const LocalAuthLayout: FC<LocalAuthLayoutProps> = ({
  children,
  lockedComponent,
}) => {
  const { authenticated, setAuthenticated, setAuthenticating } =
    useLocalAuthStore();

  const localAuthenticate = useCallback(async () => {
    try {
      setAuthenticating(true);
      const result = await LocalAuthentication.authenticateAsync();
      setAuthenticated(result.success);
      setAuthenticating(false);
    } catch (error) {
      console.log('Error when using local authentication', error);
    }
  }, [setAuthenticated, setAuthenticating]);

  return authenticated ? children : lockedComponent(localAuthenticate);
};

export { LocalAuthLayout };
