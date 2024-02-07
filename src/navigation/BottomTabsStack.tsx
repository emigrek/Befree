import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TransitionPresets } from '@react-navigation/stack';
import React from 'react';

import { BottomTabsStackParamList } from './types';

import { BottomTabsHeader } from '@/components/headers';
import { Home } from '@/components/screens';
import { Addictions } from '@/components/screens/Addictions';
import { Notifications } from '@/components/screens/Notifications';
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
      <Navigator.Screen name={'Home'} component={Home} />
      <Navigator.Screen name={'Addictions'} component={Addictions} />
      <Navigator.Screen name={'Notifications'} component={Notifications} />
    </Navigator.Navigator>
  );
};
export { BottomTabsStack };
