import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TabBarIcon } from './BottomTabsStack';
import { AddictionStackParamList } from './types';

import { AddictionHeader } from '@/components/headers';
import { ProgressScreen } from '@/components/screens/Addiction';
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
};

const AddictionStack = () => {
  const { colors } = useTheme();

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
        },
        tabBarIcon: props => {
          const { focusedName, name } = addictionIconMap[route.name];

          return (
            <TabBarIcon
              {...props}
              name={name}
              focusedName={focusedName}
              size={26}
            />
          );
        },
      })}
      initialRouteName={'Progress'}
    >
      <Navigator.Screen name="Progress" component={ProgressScreen} />
    </Navigator.Navigator>
  );
};

export { AddictionStack };
