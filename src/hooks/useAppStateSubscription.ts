import { useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';

import { useAppStateStore } from '@/store';

interface AppStateSubscription {
  onAppStateChange?: (state: AppStateStatus) => void;
}

export const useAppStateSubscription = ({
  onAppStateChange,
}: AppStateSubscription) => {
  const { setAppState } = useAppStateStore();

  useEffect(() => {
    const subscription = AppState.addEventListener('change', state => {
      onAppStateChange && onAppStateChange(state);
      setAppState(state);
    });
    return () => {
      subscription.remove();
    };
  }, [setAppState, onAppStateChange]);
};
