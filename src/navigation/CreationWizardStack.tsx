import { createStackNavigator } from '@react-navigation/stack';

import { CreationStackParamList } from './types';

import {
  Image,
  Name,
  StartDate,
  Tags,
} from '@/components/screens/CreationWizard';
import Navigation from '@/components/screens/CreationWizard/Navigation';

const Navigator = createStackNavigator<CreationStackParamList>();

const CreationWizardStack = () => {
  return (
    <Navigator.Navigator
      initialRouteName="Name"
      screenOptions={{
        header: () => <Navigation />,
      }}
    >
      <Navigator.Screen name="Name" component={Name} />
      <Navigator.Screen name="Image" component={Image} />
      <Navigator.Screen name="StartDate" component={StartDate} />
      <Navigator.Screen name="Tags" component={Tags} />
    </Navigator.Navigator>
  );
};

export { CreationWizardStack };
