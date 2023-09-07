import { getHeaderTitle } from '@react-navigation/elements';
import {
  StackHeaderProps,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import { Appbar } from 'react-native-paper';

import { InitializationStackParamList } from './types';

import { Authentication, Onboarding } from '@/screens';
import { useAuthStore, useGlobalStore } from '@/store';

const Stack = createStackNavigator<InitializationStackParamList>();

const Initialization = () => {
  const onboarded = useGlobalStore(state => state.onboarded);
  const user = useAuthStore(state => state.user);

  return (
    <Stack.Navigator initialRouteName={'Onboarding'}>
      {!onboarded && (
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={'Onboarding'}
          component={Onboarding}
        />
      )}
      {!user && (
        <Stack.Screen
          options={{
            header: props => <Header {...props} />,
          }}
          name={'Authentication'}
          component={Authentication}
        />
      )}
    </Stack.Navigator>
  );
};

const Header = ({ options, route, back, navigation }: StackHeaderProps) => {
  const title = getHeaderTitle(options, route.name);
  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

export { Initialization };
