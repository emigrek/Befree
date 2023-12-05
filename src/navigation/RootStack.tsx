import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { getIdToken } from 'firebase/auth';
import { useCallback } from 'react';

import { AuthDrawerStack } from './AuthDrawerStack';

import { RootHeader } from '@/components/headers';
import { Authentication, Loading, Onboarding } from '@/components/screens';
import { useAuthStateListener } from '@/hooks/useAuthStateListener';
import { useAuthStore, useGlobalStore } from '@/store';

const Stack = createStackNavigator();

const RootStack = () => {
  const onboarded = useGlobalStore(state => state.onboarded);
  const { user, setUser } = useAuthStore();

  const { loading } = useAuthStateListener({
    onUserChange: useCallback(
      u => {
        if (u) getIdToken(u);
        setUser(u);
      },
      [setUser],
    ),
  });

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: !onboarded,
        header: props => <RootHeader {...props} />,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      {loading && <Stack.Screen name="Loading" component={Loading} />}
      {!user && (
        <Stack.Screen name="Authentication" component={Authentication} />
      )}
      {!onboarded && user && (
        <Stack.Screen name="Onboarding" component={Onboarding} />
      )}
      {!loading && onboarded && user && (
        <Stack.Screen name="Home" component={AuthDrawerStack} />
      )}
    </Stack.Navigator>
  );
};

export { RootStack };
