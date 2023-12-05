import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { TransitionPresets } from '@react-navigation/stack';
import Ionicon from 'react-native-vector-icons/Ionicons';

import { BottomTabsStackParamList, ModalStackNavigationProp } from './types';

import { BottomTabsHeader } from '@/components/headers';
import { Addictions, Home } from '@/components/screens';
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
  Addictions: {
    name: 'list-outline',
    focusedName: 'list',
  },
};

const BottomTabsStack = () => {
  const { colors } = useTheme();
  const { navigate } = useNavigation<ModalStackNavigationProp>();

  return (
    <>
      <Navigator.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          header: props => <BottomTabsHeader {...props} />,
          tabBarStyle: {
            borderTopWidth: 1,
            borderTopColor: colors.border,
            backgroundColor: colors.background,
            height: 70,
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
        <Navigator.Screen name={'Addictions'} component={Addictions} />
      </Navigator.Navigator>
      <FAB
        icon="plus"
        customSize={60}
        color={colors.onPrimary}
        style={{ backgroundColor: colors.primary }}
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

export { BottomTabsStack, TabBarIcon };
