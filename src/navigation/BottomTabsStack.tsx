import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';

import { BottomTabsStackParamList } from './types';

import { BottomTabsHeader } from '@/components/headers';
import { Home } from '@/components/screens';
import { AddictionsScreen } from '@/components/screens/Addictions';
import { Notifications } from '@/components/screens/Notifications';
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
      screenOptions={({ route }) => ({
        tabBarShowLabel: true,
        header: props => <BottomTabsHeader {...props} />,
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
      initialRouteName={'Home'}
    >
      <Navigator.Screen name={'Home'} component={Home} />
      <Navigator.Screen
        name={'Addictions'}
        component={AddictionsScreen}
        options={{ unmountOnBlur: true }}
      />
      <Navigator.Screen name={'Notifications'} component={Notifications} />
    </Navigator.Navigator>
  );
};

interface TabBarIconProps {
  name: string;
  focusedName?: string;
  color: string;
  focused: boolean;
  size: number;
}

const TabBarIcon = ({
  name,
  focusedName,
  color,
  focused,
  size,
}: TabBarIconProps) => {
  return focused && focusedName ? (
    <Ionicon size={size} name={focusedName} color={color} />
  ) : (
    <Ionicon size={size} name={name} color={color} />
  );
};

export { BottomTabsStack, TabBarIcon };
