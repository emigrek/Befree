import { createStackNavigator } from '@react-navigation/stack';
import { useCallback } from 'react';

import { CreationStackParamList } from './types';

import {
  ImageUploading,
  NameAndImage,
  StartDate,
} from '@/components/screens/CreationWizard';
import Navigation from '@/components/screens/CreationWizard/Navigation';
import { useAddictionCreator } from '@/hooks/addiction/useAddictionCreator';
import { useAuthStore, useCreationWizardStore } from '@/store';

const Navigator = createStackNavigator<CreationStackParamList>();

const CreationWizardStack = () => {
  const user = useAuthStore(state => state.user);
  const { name, startDate, image, reset, setStartDate, setLoading } =
    useCreationWizardStore(state => ({
      name: state.name,
      startDate: state.startDate,
      image: state.image,
      reset: state.reset,
      setStartDate: state.setStartDate,
      setLoading: state.setLoading,
    }));
  const { create, imageUploadProgress, imageUploadStatus } =
    useAddictionCreator();

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
    create(addiction).then(() => {
      setLoading(false);
      reset();
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
