import { createStackNavigator } from '@react-navigation/stack';
import { useWindowDimensions } from 'react-native';

import { BottomTabsStack } from './BottomTabsStack';
import { ModalsStackParamList } from './types';

import { ModalsHeader } from '@/components/headers';
import { Add } from '@/components/screens';

const Navigator = createStackNavigator<ModalsStackParamList>();

const ModalsStack = () => {
  const { height } = useWindowDimensions();

  return (
    <Navigator.Navigator
      initialRouteName="BottomTabs"
      screenOptions={({ route }) => {
        return {
          headerShown: route.name === 'Add',
          header: props => <ModalsHeader {...props} />,
        };
      }}
    >
      <Navigator.Screen name="BottomTabs" component={BottomTabsStack} />
      <Navigator.Screen
        name="Add"
        component={Add}
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
