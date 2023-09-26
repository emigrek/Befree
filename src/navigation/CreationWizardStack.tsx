import { createStackNavigator } from '@react-navigation/stack';

import { CreationStackParamList } from './types';

import { Name, StartDate } from '@/components/screens/CreationWizard';
import Navigation from '@/components/screens/CreationWizard/Navigation';

const Navigator = createStackNavigator<CreationStackParamList>();

const CreationWizardStack = () => {
  return (
    <Navigator.Navigator
      initialRouteName="Name"
      screenOptions={{
        header: props => <Navigation {...props} />,
      }}
    >
      <Navigator.Screen name="Name" component={Name} />
      <Navigator.Screen name="StartDate" component={StartDate} />
    </Navigator.Navigator>
  );
};

export { CreationWizardStack };
