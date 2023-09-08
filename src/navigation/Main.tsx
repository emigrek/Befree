import { View } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import MDIcon from 'react-native-vector-icons/MaterialCommunityIcons';

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
      labeled={false}
      activeColor={colors.primary}
      barStyle={{
        backgroundColor: colors.tabContainer,
      }}
    >
      <Tab.Screen
        name={'Home'}
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: props => (
            <TabBarIcon
              size={24}
              name="home-outline"
              focusedName="home"
              {...props}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'AddModalTrigger'}
        component={View}
        options={{
          tabBarLabel: 'Add',
          tabBarIcon: props => (
            <TabBarIcon size={28} name="plus-circle" {...props} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('Add');
          },
        })}
      />
      <Tab.Screen
        name={'Settings'}
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: props => (
            <TabBarIcon
              size={24}
              name="cog-outline"
              focusedName="cog"
              {...props}
            />
          ),
        }}
      />
    </Tab.Navigator>
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
    <MDIcon size={size} name={focusedName} color={color} />
  ) : (
    <MDIcon size={size} name={name} color={color} />
  );
};

export { Main };
