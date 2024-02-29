import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import { AuthDrawerStack } from './AuthDrawerStack';
import { RootStackParamList } from './types';

import { RootHeader } from '@/components/headers';
import {
  AuthenticationScreen,
  LoadingScreen,
  OnboardingScreen,
} from '@/components/screens';
import { useAuthStore, useGlobalStore } from '@/store';

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
  const onboarded = useGlobalStore(state => state.onboarded);
  const { user, loading } = useAuthStore(state => ({
    user: state.user,
    loading: state.loading,
  }));

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
