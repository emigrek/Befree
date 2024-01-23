import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, NavigationState } from '@react-navigation/native';
import { useEffect, useState } from 'react';

import { useIsMounted } from './useIsMounted';

const NAVIGATION_STATE_PERSISTENCE_KEY = 'NAVIGATION_STATE';

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const usePersistingNavigationState = () => {
  const [initialNavigationState, setInitialNavigationState] =
    useState<NavigationProps['initialState']>();
  const [isRestored, setIsRestored] = useState(false);
  const isMounted = useIsMounted();

  const onNavigationStateChange = async (
    state: NavigationState | undefined,
  ) => {
    if (state === undefined) return;
    AsyncStorage.setItem(
      NAVIGATION_STATE_PERSISTENCE_KEY,
      JSON.stringify(state),
    );
  };

  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem(
          NAVIGATION_STATE_PERSISTENCE_KEY,
        );

        const state = savedStateString
          ? (JSON.parse(savedStateString) as
              | NavigationProps['initialState']
              | null)
          : undefined;

        if (state) setInitialNavigationState(state);
      } finally {
        if (isMounted()) setIsRestored(true);
      }
    };

    if (!isRestored) restoreState();
  }, [isRestored, isMounted]);

  return {
    isRestored,
    initialNavigationState,
    onNavigationStateChange,
  };
};
