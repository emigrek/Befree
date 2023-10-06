import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useCallback } from 'react';

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
  const { reset, setStartDate, setLoading } = useCreationWizardStore(state => ({
    reset: state.reset,
    setStartDate: state.setStartDate,
    setLoading: state.setLoading,
  }));
  const { create, imageUploadProgress, imageUploadStatus } =
    useAddictionCreator(user);

  const onWizardStart = useCallback(() => {
    setStartDate(new Date());
  }, [setStartDate]);

  const onWizardComplete = async () => {
    if (!user) return;

    const addiction: UnidentifiedAddiction = {
      name,
      relapses: [new Date(startDate)],
      image,
      tags: [],
    };

    setLoading(true);
    await create(addiction).then(() => {
      reset();
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
          <Navigation
            startCallback={onWizardStart}
            completeCallback={onWizardComplete}
            {...props}
          />
        ),
      }}
    >
      <Navigator.Screen name="NameAndImage" component={NameAndImage} />
      <Navigator.Screen name="StartDate" component={StartDate} />
    </Navigator.Navigator>
  );
};

export { CreationWizardStack };
