import { createStackNavigator } from '@react-navigation/stack';

import { Initialization } from './Initialization';
import { Main } from './Main';
import { RootStackParamList } from './types';

import { useAuthStore, useGlobalStore } from '@/store';

const Stack = createStackNavigator<RootStackParamList>();

const Root = () => {
  const onboarded = useGlobalStore(state => state.onboarded);
  const user = useAuthStore(state => state.user);

  return (
    <Stack.Navigator initialRouteName={'Initialization'}>
      {(!onboarded || !user) && (
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={'Initialization'}
          component={Initialization}
        />
      )}
      {user && (
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={'Main'}
          component={Main}
        />
      )}
    </Stack.Navigator>
  );
};

export { Root };
