import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TransitionPresets } from '@react-navigation/stack';
import { FC } from 'react';

import { TabBarIcon } from './BottomTabsStack';
import { AddictionScreenProps, AddictionStackParamList } from './types';

import { AddictionHeader } from '@/components/headers';
import { ProgressScreen } from '@/components/screens/Addiction';
import { AchievementsScreen } from '@/components/screens/Addiction/Achievements';
import { NotificationsScreen } from '@/components/screens/Addiction/Notifications';
import i18n from '@/i18n';
import { useTheme } from '@/theme';

const Navigator = createBottomTabNavigator<AddictionStackParamList>();

type AddictionTabsIconMap = {
  [K in keyof AddictionStackParamList]: {
    name: string;
    focusedName?: string;
  };
};

const addictionIconMap: AddictionTabsIconMap = {
  Progress: {
    name: 'timer-outline',
    focusedName: 'timer',
  },
  Achievements: {
    name: 'trophy-outline',
    focusedName: 'trophy',
  },
  Notifications: {
    name: 'notifications-outline',
    focusedName: 'notifications',
  },
};

const AddictionStack: FC<AddictionScreenProps> = props => {
  const { colors } = useTheme();
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
          borderTopWidth: 1,
          borderTopColor: colors.border,
          backgroundColor: colors.background,
          height: 95,
        },
        tabBarItemStyle: {
          marginTop: 'auto',
          marginBottom: 'auto',
          height: 50,
        },
        tabBarLabelStyle: {
          fontSize: 12,
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
        name="Notifications"
        component={NotificationsScreen}
        initialParams={params}
      />
    </Navigator.Navigator>
  );
};

export { AddictionStack };
