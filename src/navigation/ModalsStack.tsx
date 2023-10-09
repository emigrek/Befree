import { createStackNavigator } from '@react-navigation/stack';
import { useWindowDimensions } from 'react-native';

import { BottomTabsStack } from './BottomTabsStack';
import { CreationWizardStack } from './CreationWizardStack';
import { ModalsStackParamList } from './types';

import { ModalsHeader } from '@/components/headers';
import { Addiction } from '@/components/screens/Addiction';
import i18n from '@/i18n';

const Navigator = createStackNavigator<ModalsStackParamList>();

const ModalsStack = () => {
  const { height } = useWindowDimensions();

  return (
    <Navigator.Navigator
      initialRouteName="BottomTabs"
      screenOptions={({ route }) => {
        return {
          header: props => <ModalsHeader {...props} />,
          title: i18n.t(['modals', route.name.toLowerCase(), 'label']),
        };
      }}
    >
      <Navigator.Screen
        name="BottomTabs"
        options={{
          headerShown: false,
        }}
        component={BottomTabsStack}
      />
      <Navigator.Screen
        name="Add"
        component={CreationWizardStack}
        options={{
          headerShown: true,
          presentation: 'modal',
          gestureEnabled: true,
          gestureResponseDistance: height / 1.5,
        }}
      />
      <Navigator.Screen
        name="Addiction"
        component={Addiction}
        options={{
          headerShown: true,
          title: undefined,
          presentation: 'modal',
          gestureEnabled: true,
          gestureResponseDistance: height / 1.5,
        }}
      />
    </Navigator.Navigator>
  );
};

export { ModalsStack };
