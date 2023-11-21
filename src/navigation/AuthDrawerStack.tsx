import { createDrawerNavigator } from '@react-navigation/drawer';
import { useWindowDimensions } from 'react-native';

import { ModalsStack } from './ModalsStack';
import { AuthDrawerStackParamList } from './types';

import { AuthDrawer } from '@/components/drawers';

const Navigator = createDrawerNavigator<AuthDrawerStackParamList>();

const AuthDrawerStack = () => {
  const { width } = useWindowDimensions();

  return (
    <Navigator.Navigator
      initialRouteName="Modals"
      screenOptions={{
        headerShown: false,
        swipeEdgeWidth: width / 8,
        swipeMinDistance: 50,
      }}
      drawerContent={props => <AuthDrawer {...props} />}
    >
      <Navigator.Screen name="Modals" component={ModalsStack} />
    </Navigator.Navigator>
  );
};

export { AuthDrawerStack };
