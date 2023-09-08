import { NavigationProp, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { User } from 'firebase/auth';
import { useCallback } from 'react';

import { Initialization } from './Initialization';
import { Main } from './Main';
import { RootStackParamList } from './types';

import { useAuthStateListener } from '@/hooks/useAuthStateListener';
import { useAuthStore } from '@/store';

const Stack = createStackNavigator<RootStackParamList>();

const Root = () => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { setUser } = useAuthStore(state => ({
    setUser: state.setUser,
  }));

  const handleSignIn = useCallback(
    (u: User) => {
      setUser(u);
      navigate('Main', {
        screen: 'Home',
      });
    },
    [navigate, setUser],
  );

  const handleSignOut = useCallback(() => {
    setUser(null);
    navigate('Initialization', {
      screen: 'Authentication',
    });
  }, [navigate, setUser]);

  useAuthStateListener({
    signInCallback: handleSignIn,
    signOutCallback: handleSignOut,
  });

  return (
    <Stack.Navigator initialRouteName={'Initialization'}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={'Initialization'}
        component={Initialization}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={'Main'}
        component={Main}
      />
    </Stack.Navigator>
  );
};

export { Root };
