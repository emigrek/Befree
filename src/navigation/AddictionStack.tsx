import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TransitionPresets } from '@react-navigation/stack';
import { FC, useLayoutEffect } from 'react';

import { AddictionScreenProps, AddictionStackParamList } from './types';

import { AddictionHeader } from '@/components/headers';
import { LocalAuthLayout } from '@/components/layouts';
import {
  AchievementsScreen,
  ProgressScreen,
  RelapsesScreen,
  SettingsScreen,
} from '@/components/modals';
import { BottomTabsBar, TabBarIcon } from '@/components/ui/BottomTabsBar';
import { Locked } from '@/components/ui/Locked';
import { useAddiction } from '@/hooks/addiction';
import i18n from '@/i18n';
import { useLocalAuthStore } from '@/store';

const Navigator = createBottomTabNavigator<AddictionStackParamList>();

type AddictionTabsIconMap = {
  [K in keyof AddictionStackParamList]: {
    name: string;
    focusedName?: string;
  };
};

const addictionIconMap: AddictionTabsIconMap = {
  Progress: {
    name: 'time-outline',
    focusedName: 'time',
  },
  Relapses: {
    name: 'calendar-outline',
    focusedName: 'calendar',
  },
  Achievements: {
    name: 'trophy-outline',
    focusedName: 'trophy',
  },
  Settings: {
    name: 'cog-outline',
    focusedName: 'cog',
  },
};

const AddictionStackNavigator: FC<AddictionScreenProps> = props => {
  return (
    <Navigator.Navigator
      tabBar={props => <BottomTabsBar {...props} />}
      screenOptions={({ route }) => ({
        tabBarLabel: i18n.t([
          'modals',
          'addiction',
          route.name.toLowerCase(),
          'label',
        ]),
        header: props => <AddictionHeader {...props} />,
        tabBarIcon: props => (
          <TabBarIcon {...addictionIconMap[route.name]} {...props} />
        ),
        ...TransitionPresets.SlideFromRightIOS,
      })}
      initialRouteName={'Progress'}
    >
      <Navigator.Screen
        name="Progress"
        component={ProgressScreen}
        initialParams={props.route.params}
      />
      <Navigator.Screen
        name="Relapses"
        component={RelapsesScreen}
        initialParams={props.route.params}
      />
      <Navigator.Screen
        name="Achievements"
        component={AchievementsScreen}
        initialParams={props.route.params}
      />
      <Navigator.Screen
        name="Settings"
        component={SettingsScreen}
        initialParams={props.route.params}
      />
    </Navigator.Navigator>
  );
};

const AddictionStack: FC<AddictionScreenProps> = props => {
  const params = props.route.params;
  const authenticated = useLocalAuthStore(state => state.authenticated);
  const addiction = useAddiction({ id: params.addictionId });
  const hidden = addiction?.hidden ?? false;

  useLayoutEffect(() => {
    if (!authenticated && hidden) {
      props.navigation.setOptions({
        headerShown: true,
      });
    }
  }, [props.navigation, authenticated, hidden]);

  if (hidden) {
    return (
      <LocalAuthLayout
        lockedComponent={localAuthenticate => (
          <Locked localAuthenticate={localAuthenticate} />
        )}
      >
        <AddictionStackNavigator {...props} />
      </LocalAuthLayout>
    );
  }

  return <AddictionStackNavigator {...props} />;
};

export { AddictionStack };
