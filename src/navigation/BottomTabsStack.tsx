import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { View } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

import { BottomTabsStackParamList, ModalsStackParamList } from './types';

import { Header } from '@/components/headers';
import { Home } from '@/components/screens';
import { FAB } from '@/components/ui/FAB';
import i18n from '@/i18n';
import { useTheme } from '@/theme';

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
  Notifications: {
    name: 'notifications-outline',
    focusedName: 'notifications',
  },
};

type ModalStackNavigationProp = StackNavigationProp<ModalsStackParamList>;

const BottomTabsStack = () => {
  const { colors } = useTheme();
  const { navigate } = useNavigation<ModalStackNavigationProp>();

  return (
    <>
      <Navigator.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          header: props => <Header {...props} />,
          tabBarStyle: {
            borderTopWidth: 1,
            borderTopColor: colors.border,
          },
          title: i18n.t(['screens', route.name.toLowerCase(), 'label']),
          tabBarIcon: props => {
            const { focusedName, name } = bottomTabsIconMap[route.name];

            return (
              <TabBarIcon name={name} focusedName={focusedName} {...props} />
            );
          },
        })}
        initialRouteName={'Home'}
      >
        <Navigator.Screen name={'Home'} component={Home} />
        <Navigator.Screen name={'Notifications'} component={View} />
      </Navigator.Navigator>
      <FAB
        icon="plus"
        customSize={50}
        color={colors.inverseOnSurface}
        mode={'flat'}
        onPress={() => navigate('Add')}
      />
    </>
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

export { BottomTabsStack };
