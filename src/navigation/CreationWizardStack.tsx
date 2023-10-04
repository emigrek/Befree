import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { CreationStackParamList, ModalStackNavigationProp } from './types';

import {
  ImageUploading,
  NameAndImage,
  StartDate,
} from '@/components/screens/CreationWizard';
import Navigation from '@/components/screens/CreationWizard/Navigation';
import { useAddictionCreator } from '@/services/firestore';
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
  const { create, imageUploadProgress, imageUploadStatus } =
    useAddictionCreator(user);

  const onWizardComplete = async () => {
    if (!user) return;

    const addiction: UnidentifiedAddiction = {
      name,
      startDate,
      image,
      tags: [],
    };

    await create(addiction).then(() => {
      resetCreationWizard();
      modalStackNavigation.navigate('BottomTabs', {
        screen: 'Addictions',
      });
    });
  };

  if (imageUploadStatus) {
    return <ImageUploading progress={imageUploadProgress} />;
  }

  return (
    <Navigator.Navigator
      initialRouteName="NameAndImage"
      screenOptions={{
        header: props => (
          <Navigation completeCallback={onWizardComplete} {...props} />
        ),
      }}
    >
      <Navigator.Screen name="NameAndImage" component={NameAndImage} />
      <Navigator.Screen name="StartDate" component={StartDate} />
    </Navigator.Navigator>
  );
};

export { CreationWizardStack };
