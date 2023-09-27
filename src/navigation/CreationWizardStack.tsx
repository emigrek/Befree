import { createStackNavigator } from '@react-navigation/stack';

import { CreationStackParamList } from './types';

import { NameAndImage, StartDate } from '@/components/screens/CreationWizard';
import Navigation from '@/components/screens/CreationWizard/Navigation';

const Navigator = createStackNavigator<CreationStackParamList>();

const CreationWizardStack = () => {
  return (
    <Navigator.Navigator
      initialRouteName="NameAndImage"
      screenOptions={{
        header: props => <Navigation {...props} />,
      }}
    >
      <Navigator.Screen name="NameAndImage" component={NameAndImage} />
      <Navigator.Screen name="StartDate" component={StartDate} />
    </Navigator.Navigator>
  );
};

export { CreationWizardStack };
