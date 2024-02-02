import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TransitionPresets } from '@react-navigation/stack';
import { FC } from 'react';

import { TabBarIcon } from './BottomTabsStack';
import { AddictionScreenProps, AddictionStackParamList } from './types';

import { AddictionHeader } from '@/components/headers';
import {
  AchievementsScreen,
  ProgressScreen,
  SettingsScreen,
} from '@/components/screens/Addiction';
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
      screenOptions={({ route }) => ({
        tabBarLabel: i18n.t([
          'modals',
          'addiction',
          route.name.toLowerCase(),
          'label',
        ]),
        header: props => <AddictionHeader {...props} />,
        tabBarStyle: {
          height: 100,
          elevation: 15,
        },
        tabBarItemStyle: {
          marginTop: 'auto',
          marginBottom: 'auto',
          height: 50,
        },
        tabBarLabelStyle: {
          fontSize: 11,
        },
        tabBarIcon: props => {
          const { focusedName, name } = addictionIconMap[route.name];

          return (
            <TabBarIcon
              {...props}
              name={name}
              focusedName={focusedName}
              size={30}
            />
          );
        },
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
