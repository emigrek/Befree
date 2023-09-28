import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { CreationStackParamList, ModalStackNavigationProp } from './types';

import { NameAndImage, StartDate } from '@/components/screens/CreationWizard';
import Navigation from '@/components/screens/CreationWizard/Navigation';
import { useCreationWizardStore } from '@/store';

const Navigator = createStackNavigator<CreationStackParamList>();

const CreationWizardStack = () => {
  const modalStackNavigation = useNavigation<ModalStackNavigationProp>();
  const resetCreationWizard = useCreationWizardStore(state => state.reset);

  const onComplete = () => {
    modalStackNavigation.navigate('BottomTabs', {
      screen: 'Addictions',
    });
    resetCreationWizard();
  };

  return (
    <Navigator.Navigator
      initialRouteName="NameAndImage"
      screenOptions={{
        header: props => (
          <Navigation completeCallback={onComplete} {...props} />
        ),
      }}
    >
      <Navigator.Screen name="NameAndImage" component={NameAndImage} />
      <Navigator.Screen name="StartDate" component={StartDate} />
    </Navigator.Navigator>
  );
};

export { CreationWizardStack };
