import * as LocalAuthentication from 'expo-local-authentication';
import { useCallback, useEffect } from 'react';

import { useLocalAuthStore } from '@/store';

const useLocalAuthenticationHardwareStatus = () => {
  const setHasHardware = useLocalAuthStore(state => state.setHasHardware);

  const refresh = useCallback(async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    setHasHardware(hasHardware);
  }, [setHasHardware]);

  useEffect(() => {
    refresh();
  }, [refresh]);
};

export { useLocalAuthenticationHardwareStatus };
