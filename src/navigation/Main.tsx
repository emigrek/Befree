import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';

import { MainStackParamList } from './types';

import { Dashboard, Settings } from '@/screens';
import { useDynamicTheme } from '@/theme';

const Tab = createMaterialBottomTabNavigator<MainStackParamList>();

const Main = () => {
  const { colors } = useDynamicTheme();

  return (
    <Tab.Navigator
      initialRouteName={'Dashboard'}
      shifting={true}
      sceneAnimationEnabled={false}
      activeColor={colors.primary}
      barStyle={{
        backgroundColor: colors.background,
        borderTopWidth: 2,
        borderTopColor: colors.border,
      }}
      compact={true}
    >
      <Tab.Screen
        name={'Dashboard'}
        component={Dashboard}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: 'view-dashboard',
        }}
      />
      <Tab.Screen
        name={'Settings'}
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: 'cog',
        }}
      />
    </Tab.Navigator>
  );
};

export { Main };
