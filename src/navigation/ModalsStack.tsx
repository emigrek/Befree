import { createStackNavigator } from '@react-navigation/stack';
import { useWindowDimensions } from 'react-native';

import { BottomTabsStack } from './BottomTabsStack';
import { CreationWizardStack } from './CreationWizardStack';
import { ModalsStackParamList } from './types';

import { ModalsHeader } from '@/components/headers';
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
          headerShown: route.name === 'Add',
          title: i18n.t(['modals', route.name.toLowerCase(), 'label']),
        };
      }}
    >
      <Navigator.Screen name="BottomTabs" component={BottomTabsStack} />
      <Navigator.Screen
        name="Add"
        component={CreationWizardStack}
        options={{
          presentation: 'modal',
          gestureEnabled: true,
          gestureResponseDistance: height / 1.5,
        }}
      />
    </Navigator.Navigator>
  );
};

export { ModalsStack };
