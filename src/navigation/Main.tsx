import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';

import { MainStackParamList } from './types';

import { Home, Settings } from '@/screens';
import { useDynamicTheme } from '@/theme';

const Tab = createMaterialBottomTabNavigator<MainStackParamList>();

const Main = () => {
  const { colors } = useDynamicTheme();

  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      shifting={true}
      activeColor={colors.primary}
      barStyle={{
        backgroundColor: colors.tabContainer,
      }}
      compact={true}
    >
      <Tab.Screen
        name={'Home'}
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: 'home',
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
