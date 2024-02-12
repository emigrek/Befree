import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect, useState } from 'react';

const useLocalAuthenticationHardwareStatus = () => {
  const [hasHardware, setHasHardware] = useState(false);

  const refresh = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    setHasHardware(hasHardware);
  };

  useEffect(() => {
    refresh();
  }, []);

  return { hasHardware, refresh };
};

export { useLocalAuthenticationHardwareStatus };
