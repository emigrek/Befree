import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TransitionPresets } from '@react-navigation/stack';
import React from 'react';

import { BottomTabsStackParamList } from './types';

import { BottomTabsHeader } from '@/components/headers';
import {
  AddictionsScreen,
  HomeScreen,
  NotificationsScreen,
} from '@/components/screens';
import { BottomTabsBar, TabBarIcon } from '@/components/ui/BottomTabsBar';
import i18n from '@/i18n';

const Navigator = createBottomTabNavigator<BottomTabsStackParamList>();

type BottomTabsIconMap = {
  [K in keyof BottomTabsStackParamList]: {
    name: string;
    focusedName?: string;
  };
};

const bottomTabsIconMap: BottomTabsIconMap = {
  Home: {
    name: 'home-outline',
    focusedName: 'home',
  },
  Addictions: {
    name: 'list-outline',
    focusedName: 'list',
  },
  Notifications: {
    name: 'notifications-outline',
    focusedName: 'notifications',
  },
};

const BottomTabsStack = () => {
  return (
    <Navigator.Navigator
      tabBar={props => <BottomTabsBar {...props} />}
      screenOptions={({ route }) => ({
        header: props => <BottomTabsHeader {...props} />,
        title: i18n.t(['screens', route.name.toLowerCase(), 'label']),
        tabBarIcon: props => (
          <TabBarIcon {...bottomTabsIconMap[route.name]} {...props} />
        ),
        ...TransitionPresets.SlideFromRightIOS,
      })}
      initialRouteName={'Home'}
    >
      <Navigator.Screen name={'Home'} component={HomeScreen} />
      <Navigator.Screen name={'Addictions'} component={AddictionsScreen} />
      <Navigator.Screen
        name={'Notifications'}
        component={NotificationsScreen}
      />
    </Navigator.Navigator>
  );
};
export { BottomTabsStack };
