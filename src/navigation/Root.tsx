import { createStackNavigator } from '@react-navigation/stack';

import { Initialization } from './Initialization';
import { Main } from './Main';
import { RootStackParamList } from './types';

import { useGlobalStore } from '@/store';

const Stack = createStackNavigator<RootStackParamList>();

const Root = () => {
  const onboarded = useGlobalStore(state => state.onboarded);

  return (
    <Stack.Navigator initialRouteName={'Initialization'}>
      {!onboarded && (
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={'Initialization'}
          component={Initialization}
        />
      )}
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
