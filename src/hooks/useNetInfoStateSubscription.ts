import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { useEffect } from 'react';

import { useNetInfoStore } from '@/store';

export const useNetInfoStateSubscription = () => {
  const { setNetState } = useNetInfoStore();

  useEffect(() => {
    const handleStateChange = (state: NetInfoState) => {
      setNetState(state);
    };

    NetInfo.fetch().then(handleStateChange);

    const unsub = NetInfo.addEventListener(handleStateChange);
    return unsub;
  }, [setNetState]);
};
