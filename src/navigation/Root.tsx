import { createStackNavigator } from '@react-navigation/stack';
import { User } from 'firebase/auth';
import { useCallback } from 'react';

import { Main } from './Main';
import { RootStackParamList } from './types';

import { useAuthStateListener } from '@/hooks/useAuthStateListener';
import { Add, Authentication, Loading, Onboarding } from '@/screens';
import { useAuthStore, useGlobalStore } from '@/store';

const RootStack = createStackNavigator<RootStackParamList>();

const Root = () => {
  const { user, setUser } = useAuthStore(state => ({
    user: state.user,
    setUser: state.setUser,
  }));
  const { onboarded } = useGlobalStore(state => ({
    onboarded: state.onboarded,
  }));

  const handleSignIn = useCallback(
    (u: User) => {
      setUser(u);
    },
    [setUser],
  );

  const handleSignOut = useCallback(() => {
    setUser(null);
  }, [setUser]);

  const { loading } = useAuthStateListener({
    signInCallback: handleSignIn,
    signOutCallback: handleSignOut,
  });

  if (!onboarded) return <Onboarding />;

  if (loading) return <Loading size={'large'} />;

  if (!user) return <Authentication />;

  return (
    <RootStack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="Main" component={Main} />
      <RootStack.Screen
        name="Add"
        component={Add}
        options={{
          presentation: 'modal',
          gestureEnabled: true,
        }}
      />
    </RootStack.Navigator>
  );
};

export { Root };
