import { useNavigation } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { useCallback } from 'react';

import { CreationStackParamList, ModalStackNavigationProp } from './types';

import { Loading } from '@/components/screens';
import {
  ImageUploading,
  NameAndImage,
  StartDate,
} from '@/components/screens/CreationWizard';
import Navigation from '@/components/screens/CreationWizard/Navigation';
import { useAddictionCreator } from '@/hooks/addiction/useAddictionCreator';
import i18n from '@/i18n';
import { useCreationWizardStore } from '@/store';

const Navigator = createStackNavigator<CreationStackParamList>();

const CreationWizardStack = () => {
  const modalStackNavigation = useNavigation<ModalStackNavigationProp>();
  const { name, startDate, image, reset, setStartDate, setLoading } =
    useCreationWizardStore(state => ({
      name: state.name,
      startDate: state.startDate,
      image: state.image,
      reset: state.reset,
      setStartDate: state.setStartDate,
      setLoading: state.setLoading,
    }));
  const {
    create: createAddiction,
    task,
    uploadProgress,
    creating,
  } = useAddictionCreator();

  const onWizardStart = useCallback(async () => {
    setStartDate(new Date());
  }, [setStartDate]);

  const onWizardComplete = useCallback(async () => {
    const addiction: UnidentifiedAddiction = {
      name,
      image,
      relapses: [],
      hidden: false,
    };

    setLoading(true);
    await createAddiction(addiction, startDate);
    reset();

    modalStackNavigation.navigate('BottomTabs', {
      screen: 'Addictions',
    });
  }, [
    name,
    image,
    startDate,
    createAddiction,
    reset,
    modalStackNavigation,
    setLoading,
  ]);

  if (task) {
    return (
      <ImageUploading
        label={i18n.t(['screens', 'creationWizard', 'uploading', 'title'])}
        progress={uploadProgress}
      />
    );
  }

  if (creating) {
    return <Loading />;
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
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Navigator.Screen name="NameAndImage" component={NameAndImage} />
      <Navigator.Screen name="StartDate" component={StartDate} />
    </Navigator.Navigator>
  );
};

export { CreationWizardStack };
