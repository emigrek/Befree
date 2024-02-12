import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { useCallback } from 'react';

import { AuthDrawerStack } from './AuthDrawerStack';
import { RootStackParamList } from './types';

import { RootHeader } from '@/components/headers';
import {
  AuthenticationScreen,
  LoadingScreen,
  OnboardingScreen,
} from '@/components/screens';
import { useAuthStateListener } from '@/hooks/useAuthStateListener';
import { useAuthStore, useGlobalStore } from '@/store';

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
  const onboarded = useGlobalStore(state => state.onboarded);
  const { user, setUser } = useAuthStore();

  const { loading } = useAuthStateListener({
    onUserChange: useCallback(
      async u => {
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
      {loading && <Stack.Screen name="Loading" component={LoadingScreen} />}
      {!user && (
        <Stack.Screen name="Authentication" component={AuthenticationScreen} />
      )}
      {!onboarded && (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      )}
      {onboarded && user && (
        <Stack.Screen name="Home" component={AuthDrawerStack} />
      )}
    </Stack.Navigator>
  );
};

export { RootStack };
