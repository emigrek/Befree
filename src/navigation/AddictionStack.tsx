import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TransitionPresets } from '@react-navigation/stack';
import { FC } from 'react';

import { AddictionScreenProps, AddictionStackParamList } from './types';

import { AddictionHeader } from '@/components/headers';
import {
  AchievementsScreen,
  ProgressScreen,
  RelapsesScreen,
  SettingsScreen,
} from '@/components/screens/Addiction';
import { BottomTabsBar, TabBarIcon } from '@/components/ui/BottomTabsBar';
import i18n from '@/i18n';

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

const AddictionStack: FC<AddictionScreenProps> = props => {
  const params = props.route.params;
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
        initialParams={params}
      />
      <Navigator.Screen
        name="Relapses"
        component={RelapsesScreen}
        initialParams={params}
      />
      <Navigator.Screen
        name="Achievements"
        component={AchievementsScreen}
        initialParams={params}
      />
      <Navigator.Screen
        name="Settings"
        component={SettingsScreen}
        initialParams={params}
      />
    </Navigator.Navigator>
  );
};

export { AddictionStack };
