import { useNavigation } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { FC, useCallback } from 'react';

import {
  AddictionCreatorParamList,
  AddictionCreatorScreenProps,
  ModalStackNavigationProp,
} from './types';

import { Loading } from '@/components/screens';
import {
  ImageUploading,
  NameAndImage,
  StartDate,
} from '@/components/screens/AddictionCreator';
import Navigation from '@/components/screens/AddictionCreator/Navigation';
import { useAddictionCreator } from '@/hooks/addiction/useAddictionCreator';
import i18n from '@/i18n';
import { useCreationWizardStore } from '@/store';

const Navigator = createStackNavigator<AddictionCreatorParamList>();

const AddictionCreatorStack: FC<AddictionCreatorScreenProps> = ({
  navigation,
  route,
}) => {
  const { hide } = route.params;
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

  const onStart = useCallback(async () => {
    setStartDate(new Date());
  }, [setStartDate]);

  const onComplete = useCallback(async () => {
    setLoading(true);

    createAddiction({
      name,
      image,
      relapses: [],
      startedAt: startDate,
      hidden: hide,
    }).then(addiction => {
      reset();

      if (addiction) {
        modalStackNavigation.navigate('Addiction', { id: addiction.id });
      }
    });
  }, [
    name,
    image,
    startDate,
    createAddiction,
    reset,
    modalStackNavigation,
    setLoading,
    hide,
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
            startCallback={onStart}
            completeCallback={onComplete}
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

export { AddictionCreatorStack };
