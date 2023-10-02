import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { CreationStackParamList, ModalStackNavigationProp } from './types';

import { NameAndImage, StartDate } from '@/components/screens/CreationWizard';
import Navigation from '@/components/screens/CreationWizard/Navigation';
import { createAddiction } from '@/services/firestore';
import { useAuthStore, useCreationWizardStore } from '@/store';

const Navigator = createStackNavigator<CreationStackParamList>();

const CreationWizardStack = () => {
  const modalStackNavigation = useNavigation<ModalStackNavigationProp>();
  const user = useAuthStore(state => state.user);

  const { name, startDate, image } = useCreationWizardStore(state => ({
    name: state.name,
    startDate: state.startDate,
    image: state.image,
  }));
  const resetCreationWizard = useCreationWizardStore(state => state.reset);

  const onComplete = async () => {
    if (!user) return;

    modalStackNavigation.navigate('BottomTabs', {
      screen: 'Addictions',
    });

    const addiction: UnidentifiedAddiction = {
      name,
      startDate,
      image,
      tags: [],
    };

    await createAddiction(user, addiction);

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
