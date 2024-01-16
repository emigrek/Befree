import * as LocalAuthentication from 'expo-local-authentication';
import React, { FC, useCallback, useEffect, useState } from 'react';

interface LocalAuthLayoutProps {
  children: React.ReactNode;
  lockedComponent: (localAuthenticate: () => void) => React.ReactNode;
}

const LocalAuthLayout: FC<LocalAuthLayoutProps> = ({
  children,
  lockedComponent,
}) => {
  const [unlocked, setUnlocked] = useState(false);

  const localAuthenticate = useCallback(async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync();
      setUnlocked(result.success);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    localAuthenticate();
  }, [localAuthenticate]);

  if (!unlocked) {
    return lockedComponent(localAuthenticate);
  }

  return <>{children}</>;
};

export { LocalAuthLayout };
