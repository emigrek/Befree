import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TransitionPresets } from '@react-navigation/stack';
import React from 'react';

import { TabBarIcon } from './BottomTabsStack';
import { HiddenAddictionsBottomTabsStackParamList } from './types';

import { LocalAuthLayout } from '@/components/layouts/LocalAuthLayout';
import { HiddenAddictions } from '@/components/screens/HiddenAddictions';
import { HiddenAddictionsNotifications } from '@/components/screens/HiddenNotifications';
import { Locked } from '@/components/ui/Locked';
import i18n from '@/i18n';

const Navigator =
  createBottomTabNavigator<HiddenAddictionsBottomTabsStackParamList>();

type HiddenAddictionsBottomTabsIconMap = {
  [K in keyof HiddenAddictionsBottomTabsStackParamList]: {
    name: string;
    focusedName?: string;
  };
};

const bottomTabsIconMap: HiddenAddictionsBottomTabsIconMap = {
  Addictions: {
    name: 'list-outline',
    focusedName: 'list',
  },
  Notifications: {
    name: 'notifications-outline',
    focusedName: 'notifications',
  },
};

const HiddenAddictionsBottomTabsStack = () => {
  return (
    <LocalAuthLayout
      lockedComponent={localAuthenticate => (
        <Locked localAuthenticate={localAuthenticate} />
      )}
    >
      <Navigator.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: true,
          headerShown: false,
          tabBarStyle: {
            height: 100,
          },
          tabBarItemStyle: {
            marginTop: 'auto',
            marginBottom: 'auto',
            height: 50,
          },
          tabBarLabelStyle: {
            fontSize: 11,
          },
          title: i18n.t(['screens', route.name.toLowerCase(), 'label']),
          tabBarIcon: props => {
            const { focusedName, name } = bottomTabsIconMap[route.name];

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
        initialRouteName={'Addictions'}
      >
        <Navigator.Screen
          name={'Addictions'}
          component={HiddenAddictions}
          options={{ unmountOnBlur: true }}
        />
        <Navigator.Screen
          name={'Notifications'}
          component={HiddenAddictionsNotifications}
        />
      </Navigator.Navigator>
    </LocalAuthLayout>
  );
};

export { HiddenAddictionsBottomTabsStack };
