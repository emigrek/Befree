import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';

export const useNetState = () => {
  const [netState, setNetState] = useState<NetInfoState>();

  useEffect(() => {
    const handleStateChange = (state: NetInfoState) => {
      setNetState(state);
    };

    NetInfo.fetch().then(handleStateChange);

    const unsub = NetInfo.addEventListener(handleStateChange);
    return unsub;
  }, []);

  return netState;
};
